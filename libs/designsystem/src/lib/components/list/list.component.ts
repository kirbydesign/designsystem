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
import { Datasource, IDatasource, SizeStrategy } from 'ngx-ui-scroll';

import { ThemeColor } from '../../helpers/theme-color.type';
import { ItemComponent } from '../item/item.component';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListHelper } from './helpers/list-helper';
import { BoundaryClass } from './list-item/list-item.component';
import { ListSwipeAction } from './list-swipe-action.type';
import {
  ListFooterDirective,
  ListHeaderDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';

export type VirtualScrollSettings = IDatasource['settings'];

export type ListShape = 'square' | 'rounded' | 'none';

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

  /**
   * Determine outline shape of:
   * - list, if {@link #isSectionsEnabled} is `false`
   * - section, if {@link #isSectionsEnabled} is `true`
   *
   * `square` means **without** rounded corners, `rounded` means **with** rounded corners.,  `none` means **without** padding, border, box-shadow and background.
   */
  @Input() shape: ListShape = 'rounded';

  @HostBinding('class.shape-rounded')
  public get isShapeRounded(): boolean {
    return this.shape === 'rounded';
  }

  @HostBinding('class.shape-none')
  public get isShapeNone(): boolean {
    return this.shape === 'none';
  }

  @HostBinding('class.item-spacing')
  @Input()
  hasItemSpacing: boolean;

  @Input() useVirtualScroll = false;

  @Input() virtualScrollViewportHeight = 500;

  @Input() virtualScrollSettings: VirtualScrollSettings = {};

  @Input() virtualScrollTimeout = 5000;

  _virtualScrollData: IDatasource = new Datasource({
    get: (index, count) => this.getVirtualDataset(index, count),
    settings: {
      minIndex: this.virtualScrollSettings.minIndex || 0,
      startIndex: this.virtualScrollSettings.startIndex || 0,
      // Default to frequent size strategy as it works well with differing item heights in sections (first/last item)
      sizeStrategy: this.virtualScrollSettings.sizeStrategy || SizeStrategy.Frequent,
      ...this.virtualScrollSettings,
    },
  });

  private getVirtualDataset(index: number, count: number): Promise<any> {
    return new Promise((resolve) => {
      const itemSlice = this.getItemsSlice(index, count);

      // If we return less items than count, virtual scroll will interprete it as EOF and stop asking for more
      if (itemSlice.length < count && this.isLoadOnDemandEnabled) {
        let elapsedTime = 0;

        /* As virtual scroll fixes the viewport causing ScrollEnd to not be emitted; do it manually to trigger load on demand */
        this.scrollDirective.scrollEnd.emit();

        const poller = setInterval(() => {
          elapsedTime += INTERVAL;

          if (this._isLoading) {
            // Just a failsafe in case this.isLoading for some reason is not reset
            if (elapsedTime > this.virtualScrollTimeout) {
              clearInterval(poller);
              resolve([]);
            }
            return;
          }

          clearInterval(poller);
          resolve(this.getItemsSlice(index, count));
        }, INTERVAL);
      } else {
        resolve(itemSlice);
      }
    });
  }

  private getItemsSlice(index: number, count: number): any[] {
    const _items = this._isSectionsEnabled ? this._virtualGroupedItems : this.items;
    return _items.slice(index, index + count);
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

  @HostBinding('class.has-sections') _isSectionsEnabled: boolean;

  _isSelectable: boolean;
  _isLoading: boolean;
  _groupedItems: any[];
  _virtualGroupedItems: any[];
  _selectedItem: any;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {
    // Make sure that virtual items are made selectable when entering the DOM
    this._virtualScrollData.adapter.isLoading$.subscribe((loading) => {
      if (!loading && this._isSelectable) {
        this.kirbyItems.forEach((item) => {
          item.selectable = true;
        });
      }
    });
  }

  ngOnInit() {
    this._isSelectable = this.itemSelect.observers.length > 0;

    if (this.isLoadOnDemandEnabled === undefined) {
      this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
    }
  }

  ngAfterViewInit(): void {
    if (this._isSelectable) {
      setTimeout(() => {
        this.kirbyItems.forEach((item) => {
          item.selectable = true;
        });
      });
    }
  }

  ngOnChanges(): void {
    this._isSectionsEnabled = !!this.getSectionName;
    this._groupedItems = this._isSectionsEnabled
      ? this.groupBy.transform(this.items, this.getSectionName)
      : null;

    this._virtualGroupedItems =
      this.useVirtualScroll && this._groupedItems
        ? this._groupedItems.reduce((accumulator, group) => {
            accumulator.push({ headingName: group.name });
            return accumulator.concat(...group.items);
          }, [])
        : null;
  }

  _onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }

  defaultTrackBy(index: number): any {
    return index;
  }

  sectionTrackBy(_: number, section: { name: string }): string {
    return section.name;
  }

  onItemSelect(item: any) {
    this._selectedItem = item;
    this.itemSelect.emit(this._selectedItem);
  }

  onSwipeActionSelect(args: any): void {
    args.swipeAction.onSelected(args.item);
    this.list.closeSlidingItems();
    args.event.stopPropagation();
  }

  _getBoundaryClass(index: number, section?: any[]): BoundaryClass {
    let _items = section || this.items;

    if (this._isSectionsEnabled && this.useVirtualScroll) {
      _items = this._virtualGroupedItems;
    }

    if (index === 0 || _items[index - 1]?.headingName) return this.headerTemplate ? null : 'first';

    if (index === _items.length - 1 || _items[index + 1]?.headingName)
      return this.footerTemplate ? null : 'last';
  }
}
