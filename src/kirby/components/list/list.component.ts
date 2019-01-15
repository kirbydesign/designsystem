import {
  Component,
  OnInit,
  Input,
  Directive,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Output
} from '@angular/core';
import { ItemEventData } from 'tns-core-modules/ui/list-view';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Directive({
  selector: '[kirbyListHeader]'
})
export class ListHeaderDirective {}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[];
  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate: any;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) headerTemplate: any;
  @Output() itemSelect = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onItemClick(row: any): void {
    this.itemSelect.emit(row);
  }

  onItemTap(args: ItemEventData) {
    const selectedItem = this.items[args.index];
    this.itemSelect.emit(selectedItem);
  }
}
