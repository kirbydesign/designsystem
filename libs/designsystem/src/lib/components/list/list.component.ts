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

import { PlatformService } from '../../helpers/platform.service';
import { ThemeColor } from '../../helpers/theme-color.type';
import { ItemComponent } from '../item/item.component';

import { ListHelper } from './helpers/list-helper';
import { ListSwipeAction, SwipeDirection, SwipeEnd } from './list-swipe-action';
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
  'first',
  'last',
}
@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
})
export class ListComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('list', { static: true }) list: any;

  /**
   * Provide items for the list to render. Items must be provided in the order you expect them to be rendered.
   */
  @Input()
  items: any[] = [];

  datasource: IDatasource = {
    get: (index, count, success) => {
      console.log('index', index);
      console.log('count', count);

      setTimeout(() => {
        const data = [];
        const start = Math.max(0, index);
        const end = Math.min(index + count - 1, this.items.length - 1);
        if (start <= end) {
          for (let i = start; i <= end; i++) {
            const itemMeta = { itemIndex: i, totalCount: this.items.length };
            data.push({ item: this.items[i], itemMeta });
          }
        }
        console.log('DATA', data);

        success(data);
      }, 400);
    },
    settings: {
      minIndex: 0,
      startIndex: 0,
      bufferSize: 20,
    },
  };

  @Input()
  getItemColor: (item: any) => ThemeColor;

  /**
   * Callback to determine name of section. Sections will be ordered alphabetically.
   */
  @Input() getSectionName: (item: any) => string;

  /**
   * Callback that defines how to track changes for items in the iterable.
   */
  @Input() trackBy: TrackByFunction<any>;

  /**
   * Text to display when no more items can be loaded (used for "on demand"-loading).
   */
  @Input() noMoreItemsText: string;

  /**
   * Determines if dividers should be shown or not.
   */
  @Input() showDivider = false;

  /**
   * Determines if list row text should turn bold on selection
   */
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

  @Input() useVirtualScroll: boolean = false;
  @Input() virtualScrollViewportHeight: number = 500;

  /**
   * Determines if the loadOnDemand event should be emitted.
   * Will default to true if there is at least one subscriber to the loadOnDemand event
   */
  @Input() isLoadOnDemandEnabled: boolean;

  /**
   * Determines if list items should have swipe actions or not
   * - the order of swipe actions is used to determine edge actions,
   * as well as their order of appearance on the screen.
   */
  @Input() swipeActions: ListSwipeAction[] = [];

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Emitting event when an item is selected (tapped on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();

  @ContentChildren(ItemComponent)
  kirbyItems: ItemComponent[];

  @ContentChild(ListHeaderDirective, { static: false, read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @ContentChild(ListSectionHeaderDirective, { static: false, read: TemplateRef })
  sectionHeaderTemplate: TemplateRef<any>;

  @ContentChild(ListFooterDirective, { static: false, read: TemplateRef })
  footerTemplate: TemplateRef<any>;

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;

  isSwipingEnabled: boolean = false;
  isSelectable: boolean;
  isLoading: boolean;
  groupedItems: any[];
  selectedItem: any;

  constructor(
    private listHelper: ListHelper,
    private groupBy: GroupByPipe,
    private platform: PlatformService
  ) {}

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

  onItemSelect(item: any) {
    this.selectedItem = item;
    this.itemSelect.emit(this.selectedItem);
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
