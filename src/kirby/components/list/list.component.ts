import { Component, OnInit, Input, Directive, TemplateRef, ContentChild, EventEmitter, Output } from '@angular/core';
import { Observable, isObservable, Subscription } from 'rxjs';
import { ListItemComponent } from './list-item/list-item.component';
import {ListSection} from '~/kirby/components/list/list-section';
// import {ListSection} from '../section';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Directive({
  selector: '[kirbyListHeader]'
})
export class ListHeaderDirective {}

@Directive({
  selector: '[kirbyListSectionHeader]'
})
export class ListSectionHeaderDirective {}

// class ListSection {
//   title: String
//   items: any;
// }

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[];
  @Input() sections: ListSection[];
  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) headerTemplate;
  @ContentChild(ListSectionHeaderDirective, {read: TemplateRef}) sectionHeaderTemplate;
  @Output() rowClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onRowClick(row): void {
    this.rowClick.emit(row);
  }

}
