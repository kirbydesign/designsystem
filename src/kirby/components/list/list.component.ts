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
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  ListItemDirective,
  ListHeaderDirective,
  ListSectionHeaderDirective,
  ListCellDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper],
})
export class ListComponent implements OnInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Input() noMoreItemsText: string;

  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;

  constructor(private listHelper: ListHelper) {}

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  onItemSelect(selectedItem: any) {
    this.itemSelect.emit(selectedItem);
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }
}
