import { Component, OnInit, Input, Directive, TemplateRef, ContentChild, EventEmitter, Output } from '@angular/core';
import { Observable, isObservable, Subscription } from 'rxjs';
import { ListItemComponent } from './list-item/list-item.component';

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

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[];
  @Input() getSection?: (item: any) => any;
  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) headerTemplate;
  @ContentChild(ListSectionHeaderDirective, {read: TemplateRef}) sectionHeaderTemplate;
  @Output() rowClick = new EventEmitter<any>();

  isSectionsEnabled: boolean;

  constructor() { }

  ngOnInit() {
    if (this.getSection) {
      this.isSectionsEnabled = true;
    }
  }

  onRowClick(row): void {
    this.rowClick.emit(row);
  }

}
