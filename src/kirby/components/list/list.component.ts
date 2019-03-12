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
import { ListLoadMoreService } from './services/list-load-more.service';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Input() loadMore?: () => Promise<boolean>;
  @Input() noMoreItemsText: string;
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) headerTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  hasMoreItems: boolean = true;
  isLoading: boolean;

  constructor(private listLoadMoreService: ListLoadMoreService) {}

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
  }

  onItemClick(row: any): void {
    this.itemSelect.emit(row);
  }

  async onLoadMore() {
    if (this.hasMoreItems && !this.isLoading) {
      this.isLoading = true;
      this.listLoadMoreService
        .handleLoadMore(this.loadMore)
        .then((moreItems) => {
          this.hasMoreItems = moreItems;
          this.isLoading = false;
          console.log('JVH HERE OK');
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          console.log('JVH HERE ERROR');
        });
    }
  }
}
