import {
  ChangeDetectionStrategy,
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
import { ListSwipeActionsHelper } from './helpers/list-swipe-actions-helper';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListSwipeAction } from './helpers/list-swipe-action';

export type ListShape = 'square' | 'rounded';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, ListSwipeActionsHelper, GroupByPipe],
})
export class ListComponent implements OnInit, OnChanges {
  /**
   * Provide items for the list to render. Items must be provided in the order you expect them to be rendered.
   */
  @Input() items: any[];

  /**
   * Callback to determine name of section. Sections will be ordered alphabetically.
   */
  @Input() getSectionName?: (item: any) => string;

  /**
   * Text to display when no more items can be loaded (used for "on demand"-loading).
   */
  @Input() noMoreItemsText: string;

  /**
   * Determines if dividers should be shown or not.
   */
  @Input() showDivider = false;

  /**
   * Determine outline shape of:
   * - list, if {@link #isSectionsEnabled} is `false`
   * - section, if {@link #isSectionsEnabled} is `true`
   *
   * `square` means **without** rounded corners, `rounded` means **with** rounded corners.
   */
  @Input() shape: ListShape = 'rounded';
  @HostBinding('class.rounded')
  public get isRounded(): boolean {
    return this.shape === 'rounded';
  }

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
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListFlexItemDirective, { read: TemplateRef }) listFlexItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChild(ListFooterDirective, { read: TemplateRef }) listFooterTemplate;
  @ViewChild('list') list: any;
  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  isSwipingDisabled: boolean = false;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];
  private orderMap: WeakMap<any, { isFirst: boolean; isLast: boolean }>;

  constructor(
    private listHelper: ListHelper,
    private listSwipeActionsHelper: ListSwipeActionsHelper,
    private groupBy: GroupByPipe
  ) {}

  ngOnInit() {
    if (this.swipeActions) {
      this.listSwipeActionsHelper.setList(this.list);
      this.isSwipingDisabled = this.listSwipeActionsHelper.getIsSwipingDisabled();
    }
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
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
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

  isFirstItem(item: any, index: number) {
    return this.isSectionsEnabled ? this.getItemOrder(item).isFirst : index === 0;
  }

  isLastItem(item: any, index: number) {
    return this.isSectionsEnabled
      ? this.getItemOrder(item).isLast
      : index === this.items.length - 1;
  }

  onItemSelect(args: any) {
    this.itemSelect.emit(this.listHelper.getSelectedItem(this.items, args));
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }

  trackByFn(index) {
    return index;
  }

  getSwipeActionsSide(side: 'left' | 'right'): ListSwipeAction[] {
    return this.swipeActions.filter((sa) => sa.position === side);
  }

  getSwipeActionIconName(swipeAction: ListSwipeAction, item: any): string {
    return this.listSwipeActionsHelper.getIsSwipeActionSelected(swipeAction, item) &&
      swipeAction.altIconName
      ? swipeAction.altIconName
      : swipeAction.iconName;
  }

  getSwipeActionTitle(swipeAction: ListSwipeAction, item: any): string {
    return this.listSwipeActionsHelper.getIsSwipeActionSelected(swipeAction, item) &&
      swipeAction.altTitle
      ? swipeAction.altTitle
      : swipeAction.title;
  }

  onActionSwipeLtR(item: any): void {
    const firstSwipeAction = this.getSwipeActionsSide('left')[0];
    this.onSwipeActionSelect(firstSwipeAction, item);
  }

  onActionSwipeRtL(item: any): void {
    const swipeActionsRight = this.getSwipeActionsSide('right');
    const lastSwipeAction = swipeActionsRight[swipeActionsRight.length - 1];
    this.onSwipeActionSelect(lastSwipeAction, item);
  }

  onSwipeActionSelect(swipeAction: ListSwipeAction, item: any): void {
    this.listSwipeActionsHelper.onSwipeActionSelected(swipeAction, item);
  }

  // Web-only
  onResize(): void {
    this.isSwipingDisabled = this.listSwipeActionsHelper.getIsSwipingDisabled();
  }

  // {N}-only
  onSwipeCellStarted(args: any): void {
    this.listSwipeActionsHelper.onSwipeCellStarted(args);
  }

  // {N}-only
  onCellSwiping(args: any): void {
    this.listSwipeActionsHelper.onCellSwiping(args);
  }

  // {N}-only
  onSwipeCellFinished(args: any): void {
    this.listSwipeActionsHelper.onSwipeCellFinished(
      args,
      this.onActionSwipeLtR.bind(this),
      this.onActionSwipeRtL.bind(this)
    );
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
}
