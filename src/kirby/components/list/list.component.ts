import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  HostBinding,
} from '@angular/core';

import {
  ListCellDirective,
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';

export type ListShape = 'square' | 'rounded';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper],
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

  private itemsSortedBySection: any[];
  private itemClasses: string[];

  constructor(private listHelper: ListHelper) {}

  ngOnInit() {
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { items } = changes;
    this.isSectionsEnabled = !!this.getSectionName;
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.determineClasses((items && items.currentValue) || []);
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  onItemSelect(selectedItem: any) {
    this.itemSelect.emit(selectedItem);
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }

  getClasses(current: any) {
    const index = this.itemsSortedBySection.indexOf(current);
    return this.itemClasses[index] || '';
  }

  private determineClasses(items: any[]) {
    if (items) {
      if (this.isSectionsEnabled) {
        // If sections are enabled, sort items by section
        const bySection = (a, b) => this.getSectionName(a).localeCompare(this.getSectionName(b));
        this.itemsSortedBySection = [...items].sort(bySection);
      } else {
        // No sections? No problem... consider all items to be in one giant section
        this.itemsSortedBySection = [...items];
      }

      // Calculate classes for each item
      this.itemClasses = this.itemsSortedBySection.map((current) =>
        this.getClassesForItem(current)
      );
    } else {
      // No items, make sure not to have any classes
      this.itemsSortedBySection = [];
      this.itemClasses = [];
    }
  }

  private getClassesForItem(current) {
    // Determine index of (current) item and if it's first / list in list
    const index = this.itemsSortedBySection.indexOf(current);
    const isFirst = index === 0;
    const isLast = index === this.items.length - 1;

    // Determine if there's an item before and / or after the (current) item
    const previous = isFirst ? null : this.itemsSortedBySection[index - 1];
    const next = isLast ? null : this.itemsSortedBySection[index + 1];

    // Determine if the (current) item is the first and / or last item of a section
    let isTopRowInSection = false;
    let isBottomRowInSection = false;
    if (this.isSectionsEnabled) {
      const currentSectionName = this.getSectionName(current);
      const previousSectionName = previous ? this.getSectionName(previous) : null;
      const nextSectionName = next ? this.getSectionName(next) : null;
      isTopRowInSection = currentSectionName !== previousSectionName;
      isBottomRowInSection = currentSectionName !== nextSectionName;
    }

    const classes = [this.shape as string];
    if (this.isSelectable) {
      classes.push('selectable');
    }
    if (isFirst || isTopRowInSection) {
      classes.push('top');
    }
    if (isLast || isBottomRowInSection) {
      classes.push('bottom');
    }
    return classes.join(' ');
  }
}
