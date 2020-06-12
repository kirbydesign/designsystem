import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  AfterViewInit,
  Input,
  TrackByFunction,
  HostBinding,
  TemplateRef,
} from '@angular/core';

import { ListShape, ListComponent } from '../list.component';
import { ThemeColor } from 'libs/designsystem/src';
import { ListSwipeAction, GroupByPipe } from '..';
import { ItemComponent } from '../..';
import { ListHelper } from '../helpers/list-helper';
import { LoadOnDemandEventData } from '../list.event';

@Component({
  selector: 'kirby-virtual-scroll-list',
  templateUrl: './virtual-scroll-list.component.html',
  styleUrls: ['./virtual-scroll-list.component.scss'],
})
export class VirtualScrollListComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('list', { static: true }) list: any;

  /**
   * Provide items for the list to render. Items must be provided in the order you expect them to be rendered.
   */

  items: any[] = this.listComponent.items;
  sortedItems: any[];

  @Input()
  getItemColor: (item: any) => ThemeColor = this.listComponent.getItemColor;

  /**
   * Callback to determine name of section. Sections will be ordered alphabetically.
   */
  @Input() getSectionName: (item: any) => string = this.listComponent.getSectionName;

  /**
   * Callback that defines how to track changes for items in the iterable.
   */
  @Input() trackBy: TrackByFunction<any> = this.listComponent.trackBy;

  /**
   * Text to display when no more items can be loaded (used for "on demand"-loading).
   */
  @Input() noMoreItemsText: string = this.listComponent.noMoreItemsText;

  /**
   * Determines if dividers should be shown or not.
   */
  @Input() showDivider = this.listComponent.showDivider;

  /**
   * Determines if list row text should turn bold on selection
   */
  @Input() markSelectedRow = this.listComponent.markSelectedRow;
  @Input() shape: ListShape = 'rounded';

  @HostBinding('class.kirby-list') true;
  /**
   * Determine outline shape of:
   * - list, if {@link #isSectionsEnabled} is `false`
   * - section, if {@link #isSectionsEnabled} is `true`
   *
   * `square` means **without** rounded corners, `rounded` means **with** rounded corners.,  `none` means **without** padding, border, box-shadow and background.
   */
  @HostBinding('class.shape-rounded')
  public get isShapeRounded(): boolean {
    return this.shape === 'rounded';
  }
  @HostBinding('class.shape-none')
  public get isShapeNone(): boolean {
    return this.shape === 'none';
  }

  @HostBinding('class.item-spacing')
  hasItemSpacing: boolean = this.listComponent.hasItemSpacing;

  /**
   * Determines if list items should have swipe actions or not
   * - the order of swipe actions is used to determine edge actions,
   * as well as their order of appearance on the screen.
   */
  swipeActions: ListSwipeAction[] = this.listComponent.swipeActions;

  /**
   * Emitting event when more items are to be loaded.
   */
  loadOnDemand = this.listComponent.loadOnDemand;

  /**
   * Emitting event when an item is selected (tapped on mobile, clicked on web)
   */
  itemSelect = this.listComponent.itemSelect;

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  itemTemplate: TemplateRef<any> = this.listComponent.itemTemplate;
  legacyItemTemplate: TemplateRef<any> = this.listComponent.legacyItemTemplate;
  kirbyItems: ItemComponent[] = this.listComponent.kirbyItems;
  legacyFlexItemTemplate: TemplateRef<any> = this.listComponent.legacyFlexItemTemplate;
  headerTemplate: TemplateRef<any> = this.listComponent.headerTemplate;
  sectionHeaderTemplate: TemplateRef<any> = this.listComponent.sectionHeaderTemplate;
  footerTemplate: TemplateRef<any> = this.listComponent.footerTemplate;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  @HostBinding('class.has-deprecated-item-template') hasDeprecatedItemTemplate: boolean;
  isSwipingEnabled: boolean = false;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];
  selectedItem: any;

  constructor(
    private listHelper: ListHelper,
    private groupBy: GroupByPipe,
    private listComponent: ListComponent
  ) {}

  ngOnInit() {
    this.hasDeprecatedItemTemplate = !!this.legacyItemTemplate || !!this.legacyFlexItemTemplate;
    this.initializeSwipeActions();
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
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

  private _headerFn(index: number) {
    return this.headerTemplate && index === 0 ? true : null;
  }

  headerFn = this._headerFn.bind(this);

  sectionNameMap = new Map<number, string>();
  private _sectionHeaderFn = (item: any, index: number) => {
    return this.sectionNameMap.get(index);
  };

  sectionHeaderFn = this._sectionHeaderFn.bind(this);

  private _footerFn(index: number, items: any[]) {
    return this.footerTemplate && items && items.length > 0 && items.length - 1 === index
      ? true
      : null;
  }

  footerFn = this._footerFn.bind(this);

  private _itemHeightFn() {
    return 56;
  }

  itemHeightFn = this._itemHeightFn.bind(this);

  ngOnChanges(): void {
    this.isSectionsEnabled = !!this.getSectionName;
    if (this.isSectionsEnabled && this.items) {
      const groupedItems = this.groupBy.transform(this.items, this.getSectionName);
      this.sortedItems = groupedItems.reduce((prev, cur) => [...prev, ...cur.items], []);

      this.sectionNameMap = new Map<number, string>();
      const groupsSet = new Set<string>();
      // calculate section name for each item and add them to a index, section name | null map,
      this.sortedItems.forEach((item: any, index) => {
        const sectionName = this.getSectionName(item);
        // TODO: extract to method
        if (groupsSet.has(sectionName)) {
          this.sectionNameMap.set(index, null);
        } else {
          this.sectionNameMap.set(index, sectionName);
          groupsSet.add(sectionName);
        }
      });
    } else {
      this.groupedItems = null;
    }
  }

  onItemSelect(args: any) {
    this.selectedItem = this.listHelper.getSelectedItem(this.items, args);
    this.itemSelect.emit(this.selectedItem);
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this as any, event);
  }
  defaultTrackBy(index: number): any {
    return index;
  }

  sectionTrackBy(_: number, section: { name: string }): string {
    return section.name;
  }

  getSwipeActionsSide(side: 'left' | 'right', item: any): ListSwipeAction[] {
    if (!Array.isArray(this.swipeActions)) {
      return [];
    }
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

  onSwipeActionSelect(swipeAction: ListSwipeAction, item: any, event: Event): void {
    swipeAction.onSelected(item);
    this.list.closeSlidingItems();
    event.stopPropagation();
  }

  onResize(): void {
    this.initializeSwipeActions();
  }

  private initializeSwipeActions(): void {
    const large = 1025; //TODO this need to be refactored.
    if (this.swipeActions && this.swipeActions.length) {
      this.isSwipingEnabled = window.innerWidth < large;
      if (this.list && !this.isSwipingEnabled) {
        this.list.closeSlidingItems();
      }
    }
  }
}
