import { registerElement } from 'nativescript-angular';
import { ContentView } from 'tns-core-modules/ui/content-view';
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

const KIRBY_LIST_COMPONENT_SELECTOR = 'kirby-list';

@Component({
  selector: KIRBY_LIST_COMPONENT_SELECTOR,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends ContentView implements OnInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Input() loadMore?: () => Promise<any[]>;
  @Input() noMoreItemsText: string;
  @Output() itemSelect = new EventEmitter<any>();

  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  hasMoreItems: boolean = true;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

  async onLoadMore(args: LoadOnDemandListViewEventData) {
    const listView: RadListView = args.object;

    if (this.loadMore) {
      const newItems = await this.loadMore();
      this.hasMoreItems = newItems && newItems.length > 0;
      if (this.hasMoreItems) {
        this.items.push(...newItems);
      }
      listView.notifyLoadOnDemandFinished(!this.hasMoreItems);
      args.returnValue = this.hasMoreItems;
    } else {
      listView.notifyLoadOnDemandFinished(true);
      args.returnValue = false;
    }
  }
}

registerElement(KIRBY_LIST_COMPONENT_SELECTOR, () => require('./list.component').ListComponent);
