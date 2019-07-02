import { IonList, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';

import {
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
  ListFlexItemDirective,
  ListItemOptionsDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListItemOptionHelper, SelectedOptionItem } from './helpers/list-item-option-helper';
export type ListShape = 'square' | 'rounded';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
})
export class ListComponent implements OnChanges, OnDestroy {
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
   * Adds padding to the list.
   */
  @Input() padding: string = null;

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Emitting event when an item is selected (tab'ed on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();
  @Output() optionItemSelect = new EventEmitter<SelectedOptionItem>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListFlexItemDirective, { read: TemplateRef }) listFlexItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChild(ListItemOptionsDirective, { read: TemplateRef }) listItemOptionsTemplate;
  @ViewChild('ionList') ionList: IonList;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];
  isSlidingEnabled: boolean = true;
  private optionItemSubscription: Subscription;
  private orderMap: WeakMap<any, { isFirst: boolean; isLast: boolean }>;

  constructor(
    private listHelper: ListHelper,
    private listItemOptionHelper: ListItemOptionHelper,
    private groupBy: GroupByPipe
  ) {
    this.optionItemSubscription = listItemOptionHelper.selectedOptionItem$.subscribe(
      (selectedOptionItem: SelectedOptionItem) => {
        this.emitSelectedOptionItem(selectedOptionItem);
      }
    );
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

  isFirstInSection(item: any) {
    return this.getItemOrder(item).isFirst;
  }

  isLastInSection(item: any) {
    return this.getItemOrder(item).isLast;
  }

  onItemSelect(args: any) {
    this.itemSelect.emit(this.listHelper.getSelectedItem(this.items, args));
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

  private emitSelectedOptionItem(selectedOptionItem: SelectedOptionItem) {
    this.optionItemSelect.emit(selectedOptionItem);

    if (this.ionList) {
      this.ionList.closeSlidingItems();
    }
  }

  ionSwipe(slidingItem: IonItemSliding, item: any) {
    slidingItem.getSlidingRatio().then(async (percent) => {
      const side = percent > 0 ? 'end' : 'start';
      const id = await this.listItemOptionHelper.getOptionItemId(slidingItem, side);
      const selectedOptionItem: SelectedOptionItem = {
        id: id,
        item: item,
      };
      this.emitSelectedOptionItem(selectedOptionItem);
    });
  }
}
