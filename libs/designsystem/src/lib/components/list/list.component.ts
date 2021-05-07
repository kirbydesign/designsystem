import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { IDatasource } from 'ngx-ui-scroll';

import { ThemeColor } from '../../helpers/theme-color.type';
import { ItemComponent } from '../item/item.component';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListHelper } from './helpers/list-helper';
import { ListSwipeAction } from './list-swipe-action';
import {
  ListFooterDirective,
  ListHeaderDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';

export enum ListShape {
  'square',
  'rounded',
  'none',
}

export enum EndClass {
  first = 'first',
  last = 'last',
}

const TIMEOUT = 5000;
const INTERVAL = 400;
@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
})
export class ListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('list', { static: true }) list: any;
  @ViewChild(InfiniteScrollDirective) scrollDirective: InfiniteScrollDirective;

  @Input()
  items: any[] = [];

  @Input() getItemColor: (item: any) => ThemeColor;

  @Input() getSectionName: (item: any) => string;

  @Input() trackBy: TrackByFunction<any>;

  @Input() noMoreItemsText: string;

  @Input() showDivider = false;

  @Input() markSelectedRow = false;

  @HostBinding('class.kirby-list') true;
  /**
   * Determine outline shape of:
   * - list, if {@link #isSectionsEnabled} is `false`
   * - section, if {@link #isSectionsEnabled} is `true`
   *
   * `square` means **without** rounded corners, `rounded` means **with** rounded corners.,  `none` means **without** padding, border, box-shadow and background.
   */
  @Input() shape = ListShape.rounded;

  @HostBinding('class.shape-rounded')
  public get isShapeRounded(): boolean {
    return this.shape === ListShape.rounded;
  }

  @HostBinding('class.shape-none')
  public get isShapeNone(): boolean {
    return this.shape === ListShape.none;
  }

  @HostBinding('class.item-spacing')
  @Input()
  hasItemSpacing: boolean;

  private _useVirtualScroll: boolean = false;
  get useVirtualScroll(): boolean {
    return this._useVirtualScroll && !this.isSectionsEnabled;
  }

  @Input() set useVirtualScroll(value: boolean) {
    this._useVirtualScroll = value;
  }

  @Input() virtualScrollViewportHeight: number = 500;

  // Possible settings are listed here: https://github.com/dhilt/ngx-ui-scroll#settings
  @Input() virtualScrollSettings: any = {};

  virtualScrollData: IDatasource = {
    get: (index, count) => this.getVirtualDataset(index, count),
    settings: {
      minIndex: this.virtualScrollSettings.minIndex || 0,
      startIndex: this.virtualScrollSettings.startIndex || 0,
      bufferSize: this.virtualScrollSettings.bufferSize || 10,
      ...this.virtualScrollSettings,
    },
  };

  private async getVirtualDataset(index: number, count: number): Promise<any> {
    const slicePromise = await new Promise((resolve) => {
      setTimeout(() => {
        const sliceWithMeta = this.getItemsSliceWitMeta(index, count);

        // If we return less items than count, virtual scroll will interprete it as EOF and stop asking for more
        if (sliceWithMeta.length < count && this.isLoadOnDemandEnabled) {
          let elapsedTime = 0;
          // Scrollend (that triggers load on demand) is not fired when we scroll as the virtual
          // scroll component fixes the viewport, so we fire it programmatically
          this.scrollDirective.scrollEnd.emit();

          const poller = setInterval(() => {
            elapsedTime += INTERVAL;

            if (this.isLoading) {
              // Just a failsafe in case this.isLoading for some reason is not reset
              if (elapsedTime > TIMEOUT) {
                clearInterval(poller);
              }

              return;
            }

            clearInterval(poller);
            resolve(this.getItemsSliceWitMeta(index, count));
          }, INTERVAL);
        } else {
          resolve(sliceWithMeta);
        }
      }, INTERVAL);
    });
    return slicePromise;
  }

  private getItemsSliceWitMeta(index: number, count: number): any[] {
    const sliceWithMeta = this.items.slice(index, index + count).map((item, sliceIndex) => {
      return {
        itemMeta: { itemIndex: index + sliceIndex, totalCount: this.items.length },
        item,
      };
    });
    return sliceWithMeta;
  }

  /**
   * Determines if the loadOnDemand event should be emitted.
   * Will default to true if there is at least one subscriber to the loadOnDemand event
   */
  @Input() isLoadOnDemandEnabled: boolean;

  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  @Input() swipeActions: ListSwipeAction[] = [];

  @Output() itemSelect = new EventEmitter<any>();

  @ContentChildren(ItemComponent)
  kirbyItems: ItemComponent[];

  @ContentChild(ListHeaderDirective, { static: false, read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @ContentChild(ListSectionHeaderDirective, { static: false, read: TemplateRef })
  sectionHeaderTemplate: TemplateRef<any>;

  @ContentChild(ListFooterDirective, { static: false, read: TemplateRef })
  footerTemplate: TemplateRef<any>;

  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;

  isSwipingEnabled: boolean = false;
  isSelectable: boolean;
  isLoading: boolean;
  groupedItems: any[];
  selectedItem: any;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {}

  ngOnInit() {
    this.isSelectable = this.itemSelect.observers.length > 0;

    if (this.isLoadOnDemandEnabled === undefined) {
      this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
    }
  }

  ngAfterViewInit(): void {
    if (this.isSelectable) {
      setTimeout(() => {
        this.kirbyItems.forEach((item) => {
          item.selectable = true;
        });
      });
    }
  }

  ngOnChanges(): void {
    this.isSectionsEnabled = !!this.getSectionName;
    if (this.isSectionsEnabled && this.items) {
      this.groupedItems = this.groupBy.transform(this.items, this.getSectionName);
    } else {
      this.groupedItems = null;
    }
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }

  defaultTrackBy(index: number): any {
    return index;
  }

  sectionTrackBy(_: number, section: { name: string }): string {
    return section.name;
  }

  onItemSelect(item: any) {
    this.selectedItem = item;
    this.itemSelect.emit(this.selectedItem);
  }

  onSwipeActionSelect(args: any): void {
    args.swipeAction.onSelected(args.item);
    this.list.closeSlidingItems();
    args.event.stopPropagation();
  }

  getItemEndClass(index: number, numberOfItems: number): EndClass {
    if (index === 0) return this.headerTemplate ? null : EndClass.first;
    if (index === numberOfItems - 1) return this.footerTemplate ? null : EndClass.last;
  }
}
