import { IonList, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
  OnDestroy,
  HostListener,
} from '@angular/core';

import {
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
  ListFlexItemDirective,
  ListItemOptionsDirective,
  ListFooterDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';
import { GroupByPipe } from './pipes/group-by.pipe';
import { SelectedItemWithOption, ItemOption } from './list-item-option/list-item-option';

export type ListShape = 'square' | 'rounded';

declare var require: any;
const style: any = require('sass-extract-loader!./list.component.scss');

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {
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
  @HostBinding('class.rounded')
  @Input()
  isRoundedShape: boolean = true;

  @Input() set shape(listShape: ListShape) {
    if (listShape === 'square') {
      this.isRoundedShape = false;
    }
    if (listShape === 'rounded') {
      this.isRoundedShape = true;
    }
  }

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Emitting event when an item is selected (tab'ed on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();
  @Output() itemOptionSelect = new EventEmitter<SelectedItemWithOption>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListFlexItemDirective, { read: TemplateRef }) listFlexItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChild(ListItemOptionsDirective, { read: TemplateRef }) listItemOptionsTemplate;
  @ContentChild(ListFooterDirective, { read: TemplateRef }) listFooterTemplate;
  @ViewChild('ionList') ionList: IonList;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];
  isSlidingDisabled: boolean = true;
  private optionItemSubscription: Subscription;
  private orderMap: WeakMap<any, { isFirst: boolean; isLast: boolean }>;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {
    this.optionItemSubscription = this.listHelper.selectedItemWithOption$.subscribe(
      (selectedItemWithOption) => {
        this.emitSelectedItemWithOption(selectedItemWithOption);
      }
    );
  }

  ngOnInit() {
    this.onResize(window.innerWidth);
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

  ngOnDestroy() {
    if (this.optionItemSubscription) {
      this.optionItemSubscription.unsubscribe();
    }
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

  onRowLoaded(event: any): void {
    this.listHelper.renderShadow(event);
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

  private emitSelectedItemWithOption(selectedItemWithOption) {
    if (selectedItemWithOption.option) {
      selectedItemWithOption.option.selected = !selectedItemWithOption.option.selected;
      this.itemOptionSelect.emit(selectedItemWithOption);

      if (this.ionList) {
        this.ionList.closeSlidingItems();
      }
    }
  }

  ionSwipe(slidingItem: IonItemSliding, item: any) {
    slidingItem.getSlidingRatio().then(async (percent) => {
      let option: ItemOption = undefined;

      if (item.slidingOptions.start && percent < 0) {
        option = item.slidingOptions.start[0];
      }

      if (item.slidingOptions.end && percent > 0) {
        option = item.slidingOptions.end[item.slidingOptions.end.length - 1];
      }

      const selectedItemWithOption: SelectedItemWithOption = {
        item: item,
        option: option,
      };
      this.emitSelectedItemWithOption(selectedItemWithOption);
    });
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width) {
    const large = style.global['$breakpoints'].value['large'].value;
    this.isSlidingDisabled = width >= large;

    if (this.ionList && this.isSlidingDisabled) {
      this.ionList.closeSlidingItems();
    }
  }
}
