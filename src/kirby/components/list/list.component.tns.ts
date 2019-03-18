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
import { KirbyLoadMoreEvent } from './list.event';

const KIRBY_LIST_COMPONENT_SELECTOR = 'kirby-list';

@Component({
  selector: KIRBY_LIST_COMPONENT_SELECTOR,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends ContentView implements OnInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Input() noMoreItemsText: string;

  @Output() loadMore = new EventEmitter<KirbyLoadMoreEvent>();
  @Output() itemSelect = new EventEmitter<any>();

  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  hasMoreItems: boolean = true;

  private isLoadMoreEnabled: boolean;

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
    this.isLoadMoreEnabled = this.loadMore.observers.length > 0;
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

  async onLoadMore(args: LoadOnDemandListViewEventData) {
    const listView: RadListView = args.object;

    if (this.isLoadMoreEnabled && this.hasMoreItems) {
      this.loadMore.emit({
        complete: (hasMoreToLoad: boolean) => {
          this.hasMoreItems = hasMoreToLoad;
          listView.notifyLoadOnDemandFinished(!this.hasMoreItems);
          args.returnValue = this.hasMoreItems;
        },
      });
    } else {
      listView.notifyLoadOnDemandFinished(true);
      args.returnValue = false;
    }
  }
}

registerElement(KIRBY_LIST_COMPONENT_SELECTOR, () => require('./list.component').ListComponent);
