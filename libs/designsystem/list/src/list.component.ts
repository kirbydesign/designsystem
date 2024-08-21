import {
  Component,
  ContentChild,
  ElementRef,
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
import { LoadOnDemandEvent } from './list.event';

export type ListShape = 'square' | 'rounded' | 'none';

export type StandAloneSpacing =
  | 'xxxxs'
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl';
@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper],
})
export class ListComponent implements OnInit, OnChanges {
  @ViewChild('list', { static: true }) list: any;
  @ViewChild(InfiniteScrollDirective) scrollDirective: InfiniteScrollDirective;

  /**
   * Provide items for the list to render. Items must be provided in the order you expect them to be rendered.
   */
  @Input()
  items: any[] = [];

  @Input() getItemColor: (item: any) => ThemeColor;

  /**
   * Callback to determine name of section. Sections will be ordered alphabetically.
   */
  @Input() getSectionName: (item: any) => string;

  /**
   * Callback that defines how to track changes for items in the iterable.
   */
  @Input() trackBy: TrackByFunction<any>;

  /**
   * Property name to decide which items should be stand alone
   */
  @Input() getStandAloneByProperty: string;

  /**
   * Bottom margin for stand alone items
   */
  @Input() standAloneSpacing: StandAloneSpacing = 'xxs';

  /**
   * Text to display when no more items can be loaded (used for "on demand"-loading).
   */
  @Input() noMoreItemsText: string;

  /**
   * Determines if dividers (bottom-border on list items) should be shown or not.
   */
  @Input() showDivider = true;

  /**
   * Determines if list row text should turn bold on selection
   */
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

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Determines if list items should have swipe actions or not
   * - the order of swipe actions is used to determine edge actions,
   * as well as their order of appearance on the screen.
   */
  @Input() swipeActions: ListSwipeAction[] = [];

  /**
   * Emitting event when an item is selected (tapped on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();

  @Input() disableSelectionHighlight: boolean = false;

  @ContentChild(ListHeaderDirective, { static: false, read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @ContentChild(ListSectionHeaderDirective, { static: false, read: TemplateRef })
  sectionHeaderTemplate: TemplateRef<any>;

  @ContentChild(ListFooterDirective, { static: false, read: TemplateRef })
  footerTemplate: TemplateRef<any>;

  /**
   * The first element that matches ListItemDirective.
   * As a structural directive it unfolds into a template. This is a reference to that.
   */
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  @HostBinding('class.has-sections') _isSectionsEnabled: boolean;
  @HostBinding('class.has-stand-alone') _isStandAloneEnabled: boolean;

  _isSelectable: boolean;
  _isLoading: boolean;
  _groupedItems: any[];
  _selectedItem: any;

  constructor(private listHelper: ListHelper, public elem: ElementRef) {}

  ngOnInit() {
    this._isSelectable = this.itemSelect.observers.length > 0;

    if (this.isLoadOnDemandEnabled === undefined) {
      this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
    }
  }

  ngOnChanges(): void {
    this._isSectionsEnabled = !!this.getSectionName;
    this._isStandAloneEnabled = !!this.getStandAloneByProperty;

    if (this._isSectionsEnabled && this._isStandAloneEnabled) {
      this._groupedItems = this.listHelper.groupSectionsWithStandAloneItems(
        this.items,
        this.getSectionName,
        this.getStandAloneByProperty
      );
    } else if (this._isSectionsEnabled) {
      this._groupedItems = this.listHelper.groupSections(this.items, this.getSectionName);
    } else if (this._isStandAloneEnabled) {
      this._groupedItems = this.listHelper.groupStandAloneItems(
        this.items,
        this.getStandAloneByProperty
      );
    }
  }

  _onLoadOnDemand() {
    this.listHelper.onLoadOnDemand(this);
  }

  defaultTrackBy(index: number): any {
    return index;
  }

  sectionTrackBy(_: number, section: { name: string }): string {
    return section.name;
  }

  onItemSelect(item: any) {
    if (!this.disableSelectionHighlight) {
      this._selectedItem = item;
    }
    this.itemSelect.emit(item);
  }

  onSwipeActionSelect(args: any): void {
    args.swipeAction.onSelected(args.item);
    this.list.closeSlidingItems();
    args.event.stopPropagation();
  }

  _getBoundaryClass(index: number, section?: any[]): BoundaryClass[] | BoundaryClass {
    if (index === 0) {
      if (this.headerTemplate) return null;
      else return section.length === 1 ? ['first', 'last'] : 'first';
    }

    if (index === section.length - 1) {
      return this.footerTemplate ? null : 'last';
    }

    return null;
  }

  standAloneClass() {
    return this._isStandAloneEnabled ? `stand-alone-bottom-margin-${this.standAloneSpacing}` : '';
  }
}
