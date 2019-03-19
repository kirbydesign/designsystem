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
import { LoadOnDemandEvent } from './list.event';

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

  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Output() itemSelect = new EventEmitter<any>();

  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  isLoadOnDemandEnabled: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

  onLoadOnDemand(args: LoadOnDemandListViewEventData): void {
    const listView: RadListView = args.object;

    if (this.isLoadOnDemandEnabled) {
      this.loadOnDemand.emit({
        complete: (disableLoadOnDemand: boolean) => {
          this.isLoadOnDemandEnabled = !disableLoadOnDemand;
          listView.notifyLoadOnDemandFinished(disableLoadOnDemand);
          args.returnValue = this.isLoadOnDemandEnabled;
        },
      });
    } else {
      listView.notifyLoadOnDemandFinished(true);
      args.returnValue = false;
    }
  }
}

registerElement(KIRBY_LIST_COMPONENT_SELECTOR, () => require('./list.component').ListComponent);
