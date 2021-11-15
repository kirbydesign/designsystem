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

import { ThemeColor } from '@kirbydesign/core';

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

export type ListShape = 'square' | 'rounded' | 'none';

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
  _selectedItem: any;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {}

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

    if (index === 0 || _items[index - 1]?.headingName) return this.headerTemplate ? null : 'first';

    if (index === _items.length - 1 || _items[index + 1]?.headingName)
      return this.footerTemplate ? null : 'last';
  }
}
