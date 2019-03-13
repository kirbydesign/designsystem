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
  LoadOnDemandListViewEventData,
  RadListView,
} from 'nativescript-ui-listview/ui-listview.common';

import {
  ListItemDirective,
  ListHeaderDirective,
  ListSectionHeaderDirective,
  ListCellDirective,
} from './list.directive';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Input() loadMore?: () => Promise<any[]>;
  @Input() noMoreItemsText: string;
  @Output() itemSelect = new EventEmitter<any>();

  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) headerTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  hasMoreItems: boolean = true;

  constructor() {}

  posts: any[] = [];

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;

    for (let i = 0; i < 100; i++) {
      this.posts.push({
        title: 'Lorem Ipsum',
        subTitle: 'Lorem ipsum dolor sit amet.',
        amount: i,
        detail: i,
      });
    }
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

  rowDefinition(headerTemplate: any): string {
    return headerTemplate ? 'auto,*' : '*';
  }

  rowNumberForListView(headerTemplate: any): string {
    return headerTemplate ? '1' : '0';
  }

  async onLoadMore(args: LoadOnDemandListViewEventData) {
    var listView: RadListView = args.object;
    const newItems = await this.loadMore();
    this.hasMoreItems = newItems && newItems.length > 0;
    if (this.hasMoreItems) {
      this.items.push(...newItems);
    }
    listView.notifyLoadOnDemandFinished(!this.hasMoreItems);
    args.returnValue = this.hasMoreItems;
  }
}
