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
  ListFlexItemDirective,
  ListFooterDirective,
  ListHeaderDirective,
  ListItemDirective,
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
            data.push(this.items[i]);
          }
        }
        console.log('DATA', data);

        success(data);
      }, 400);
    },
    settings: {
      minIndex: 0,
      startIndex: 0,
      bufferSize: 10,
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

  @Input() useVirtualScrolling?: boolean = false;

  @Input() virtualScrollViewportHeight?: number = 500;

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

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChild(ListItemDirective, { static: true, read: TemplateRef })
  legacyItemTemplate: TemplateRef<any>;
  @ContentChildren(ItemComponent)
  kirbyItems: ItemComponent[];
  @ContentChild(ListFlexItemDirective, { static: true, read: TemplateRef })
  legacyFlexItemTemplate: TemplateRef<any>;
  @ContentChild(ListHeaderDirective, { static: false, read: TemplateRef })
  headerTemplate: TemplateRef<any>;
  @ContentChild(ListSectionHeaderDirective, { static: false, read: TemplateRef })
  sectionHeaderTemplate: TemplateRef<any>;
  @ContentChild(ListFooterDirective, { static: false, read: TemplateRef })
  footerTemplate: TemplateRef<any>;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  @HostBinding('class.has-deprecated-item-template') hasDeprecatedItemTemplate: boolean;
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
    this.hasDeprecatedItemTemplate = !!this.legacyItemTemplate || !!this.legacyFlexItemTemplate;
    this.initializeSwipeActions();
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

  sectionTrackBy(_: number, section: { name: string }): string {
    return section.name;
  }

  getSwipeActions(item: any, side?: SwipeDirection): ListSwipeAction[] {
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
      return side ? sa.position === side : true;
    });
  }

  hasSwipeActions(item: any): boolean {
    if (!Array.isArray(this.swipeActions)) {
      return false;
    }
    return this.swipeActions.some((sa) => {
      if (sa.isDisabled instanceof Function && sa.isDisabled(item)) {
        return false;
      }
      if (sa.isDisabled === true) {
        return false;
      }
      return sa.position === SwipeDirection.left || sa.position === SwipeDirection.right;
    });
  }

  getSwipeActionEnd(item: any): SwipeEnd {
    if (this.getSwipeActions(item, SwipeDirection.left).length) {
      return SwipeEnd.start;
    }
    if (this.getSwipeActions(item, SwipeDirection.right).length) {
      return SwipeEnd.end;
    }
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

  getItemOrderClass(index: number): string {
    if (index === 0) return this.headerTemplate ? '' : 'first';
    if (index === this.items.length - 1) return this.footerTemplate ? '' : 'last';
  }

  private initializeSwipeActions(): void {
    if (this.swipeActions && this.swipeActions.length) {
      this.isSwipingEnabled = this.platform.isTouch();
    }
  }
}
