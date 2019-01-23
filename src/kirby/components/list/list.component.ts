import {
  Component,
  OnInit,
  Input,
  Directive,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Output,
  ContentChildren,
  QueryList
} from '@angular/core';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { ListCellComponent } from './list-cell/list-cell.component';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Directive({
  selector: '[kirbyListHeader]'
})
export class ListHeaderDirective {}

@Directive({
  selector: '[kirbyListCell]'
})
export class ListCellDirective {}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[];
  @Output() itemSelect = new EventEmitter<any>();
  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate: any;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) headerTemplate: any;

  @ContentChildren(ListCellDirective, {read: TemplateRef}) listCellTemplates: QueryList<any>;
  @ContentChildren(ListCellComponent, {read: TemplateRef}) listCellComponentTemplates: QueryList<ListCellComponent>;

  constructor() {}

  ngOnInit() {}

  onItemClick(row: any): void {
    this.itemSelect.emit(row);
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

//  get rowHeight(): number {

//  }

}
