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
  @Input() getSection?: (item: any) => string;
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) headerTemplate;
  @ContentChild(ListSectionHeaderDirective, {read: TemplateRef}) sectionHeaderTemplate;

  isSectionsEnabled: boolean;

  constructor() { }

  ngOnInit() {
    if (this.getSection) {
      this.isSectionsEnabled = true;
    }
  }

  onItemClick(row: any): void {
    this.itemSelect.emit(row);
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

  rowDefinition(headerTemplate: any): string {
    return headerTemplate ? '*' : 'auto,*';
  }

  rowNumberForListView(headerTemplate: any): string {
    return headerTemplate ? '0' : '1';
  }
}
