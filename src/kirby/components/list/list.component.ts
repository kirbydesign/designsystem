import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

import {
  ListCellDirective,
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';
import { GroupByPipe } from '~/kirby/components/list/pipes/group-by.pipe';

export type ListShape = 'square' | 'rounded';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
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
  @Input() shape: ListShape = 'square';

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Emitting event when an item is selected (tab'ed on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];

  private orderMap: WeakMap<any, { isFirst: boolean; isLast: boolean }>;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {}

  ngOnInit() {
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
  }

  ngOnChanges(): void {
    this.isSectionsEnabled = !!this.getSectionName;
    if (this.isSectionsEnabled) {
      this.groupedItems = this.groupBy.transform(this.items, this.getSectionName);
      this.orderMap = this.createOrderMap(this.groupedItems);
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  getCssClasses(item: any) {
    if (!this.isSectionsEnabled) {
      return {};
    }
    const order = this.orderMap.get(item);
    return {
      first: order.isFirst,
      last: order.isLast,
      rounded: this.shape === 'rounded',
    };
  }

  onItemSelect(selectedItem: any) {
    this.itemSelect.emit(selectedItem);
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
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
