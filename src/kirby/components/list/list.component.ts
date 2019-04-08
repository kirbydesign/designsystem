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
  SimpleChanges,
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
import { ListRowClassService } from '~/kirby/components/list/list-row-class.service';

export type ListShape = 'square' | 'rounded';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, ListRowClassService],
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
  getCssClasses: (item: any) => string;

  constructor(private listHelper: ListHelper, private rowClassService: ListRowClassService) {
    this.getCssClasses = rowClassService.getCssClasses.bind(this);
  }

  ngOnInit() {
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
  }

  ngOnChanges(): void {
    this.isSectionsEnabled = !!this.getSectionName;
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.rowClassService.update({
      items: this.items || [],
      getSectionName: this.getSectionName,
      shape: this.shape,
    });
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  onItemSelect(selectedItem: any) {
    this.itemSelect.emit(selectedItem);
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }
}
