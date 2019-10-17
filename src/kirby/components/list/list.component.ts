import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  TrackByFunction,
} from '@angular/core';

import {
  ListFlexItemDirective,
  ListFooterDirective,
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListSwipeAction } from './list-swipe-action';
import { ThemeColor } from '@kirbydesign/designsystem/helpers/theme-color.type';

export type ListShape = 'square' | 'rounded' | 'none';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
})
export class ListComponent implements OnInit, OnChanges {
  @ViewChild('list', { static: true }) list: any;

  /**
   * Provide items for the list to render. Items must be provided in the order you expect them to be rendered.
   */

  @Input()
  items: any[];

  @Input()
  getItemColor: (item: any) => ThemeColor;

  /**
   * Callback to determine name of section. Sections will be ordered alphabetically.
   */
  @Input() getSectionName?: (item: any) => string;

  /**
   * Callback that defines how to track changes for items in the iterable.
   */
  @Input() trackBy?: TrackByFunction<any>;

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

  /**
   * Determines if list items should have swipe actions or not
   * - the order of swipe actions is used to determine edge actions,
   * as well as their order of appearance on the screen.
   */
  @Input() swipeActions?: ListSwipeAction[] = [];

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Emitting event when an item is selected (tapped on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { static: false, read: TemplateRef })
  listItemTemplate;
  @ContentChild(ListFlexItemDirective, { static: false, read: TemplateRef })
  listFlexItemTemplate;
  @ContentChild(ListHeaderDirective, { static: false, read: TemplateRef })
  listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { static: false, read: TemplateRef })
  sectionHeaderTemplate;
  @ContentChild(ListFooterDirective, { static: false, read: TemplateRef })
  listFooterTemplate;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  isSwipingDisabled: boolean = false;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];
  selectedItem: any;

  private orderMap: WeakMap<any, { isFirst: boolean; isLast: boolean }>;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {}

  ngOnInit() {
    this.initialzeSwipeActions();
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  ngOnChanges(): void {
    this.isSectionsEnabled = !!this.getSectionName;
    if (this.isSectionsEnabled && this.items) {
      this.groupedItems = this.groupBy.transform(this.items, this.getSectionName);
      this.orderMap = this.createOrderMap(this.groupedItems);
    } else {
      this.groupedItems = null;
      this.orderMap = null;
    }
  }

  isFirstItem(item: any, index: number) {
    return this.isSectionsEnabled ? this.getItemOrder(item).isFirst : index === 0;
  }

  isLastItem(item: any, index: number) {
    return this.isSectionsEnabled
      ? this.getItemOrder(item).isLast
      : index === this.items.length - 1;
  }

  onItemSelect(args: any) {
    this.selectedItem = this.listHelper.getSelectedItem(this.items, args);
    this.itemSelect.emit(this.selectedItem);
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }

  defaultTrackBy(index: number): any {
    return index;
  }

  getSwipeActionsSide(side: 'left' | 'right', item: any): ListSwipeAction[] {
    return this.swipeActions.filter((sa) => {
      if (sa.isDisabled instanceof Function && sa.isDisabled(item)) {
        return false;
      }
      if (sa.isDisabled === true) {
        return false;
      }
      return sa.position === side;
    });
  }

  getSwipeActionIcon(swipeAction: ListSwipeAction, item: any): string {
    if (!swipeAction.icon) return;

    if (swipeAction.icon instanceof Function) {
      return swipeAction.icon(item);
    }
    return swipeAction.icon;
  }

  getSwipeActionTitle(swipeAction: ListSwipeAction, item: any): string {
    if (swipeAction.title instanceof Function) {
      return swipeAction.title(item);
    }
    return swipeAction.title;
  }

  getSwipeActionType(swipeAction: ListSwipeAction, item: any): ThemeColor {
    if (swipeAction.type instanceof Function) {
      return swipeAction.type(item);
    }
    return swipeAction.type;
  }

  onSwipeActionSelect(swipeAction: ListSwipeAction, item: any): void {
    swipeAction.onSelected(item);
    this.list.closeSlidingItems();
  }

  onResize(): void {
    this.initialzeSwipeActions();
  }

  private createOrderMap(
    groupedItems: { name: string; items: any[] }[]
  ): WeakMap<any, { isFirst: boolean; isLast: boolean }> {
    const orderMap = new WeakMap<any, { isFirst: boolean; isLast: boolean }>();
    groupedItems.forEach((group) => {
      const lastIndexInGroup = group.items.length - 1;
      group.items.forEach((item, index) => {
        const isFirst = index === 0;
        const isLast = index === lastIndexInGroup;
        orderMap.set(item, { isFirst, isLast });
      });
    });
    return orderMap;
  }

  private getItemOrder(item: any): { isFirst: boolean; isLast: boolean } {
    const defaultOrder = { isFirst: false, isLast: false };
    if (!item) {
      return defaultOrder;
    }
    if (!this.isSectionsEnabled) {
      return defaultOrder;
    }
    const order = this.orderMap.get(item);
    if (!order) {
      console.warn('Order of list item within section not found!');
      return defaultOrder;
    }
    return order;
  }

  private initialzeSwipeActions(): void {
    const large = 1025; //TODO this need to be refactored.
    if (this.swipeActions) {
      this.isSwipingDisabled = window.innerWidth >= large;
      if (this.isSwipingDisabled) {
        this.list.closeSlidingItems();
      }
    }
  }
}
