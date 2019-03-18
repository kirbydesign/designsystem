import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

import {
  ListItemDirective,
  ListHeaderDirective,
  ListSectionHeaderDirective,
  ListCellDirective,
} from './list.directive';
import { KirbyLoadMoreEvent } from './list.event';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Input() noMoreItemsText: string;
  @Output() loadMore = new EventEmitter<KirbyLoadMoreEvent>();
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  hasMoreItems: boolean = true;
  isLoading: boolean;
  isLoadMoreEnabled: boolean;

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadMoreEnabled = this.loadMore.observers.length > 0;
  }

  onItemClick(row: any): void {
    this.itemSelect.emit(row);
  }

  async onLoadMore() {
    if (this.isLoadMoreEnabled) {
      if (this.hasMoreItems && !this.isLoading) {
        this.isLoading = true;
        this.loadMore.emit({
          complete: (hasMoreToLoad: boolean) => {
            this.hasMoreItems = hasMoreToLoad;
            this.isLoading = false;
          },
        });
      }
    }
  }
}
