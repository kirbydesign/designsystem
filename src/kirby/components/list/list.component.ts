import { Component, OnInit, Input, Directive, TemplateRef, ContentChild, EventEmitter, Output } from '@angular/core';
import { Observable, isObservable, Subscription } from 'rxjs';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[];
  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;
  @Output() rowClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onRowClick(row): void {
    this.rowClick.emit(row);
  }

}
