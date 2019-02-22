import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective { }

@Directive({
  selector: '[kirbyListHeader]'
})
export class ListHeaderDirective { }

@Directive({
  selector: '[kirbyListCell]'
})
export class ListCellDirective { }

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
  @Input() getSectionName?: (item: any) => string;
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;
  @ContentChild(ListHeaderDirective, {read: TemplateRef}) headerTemplate;
  @ContentChild(ListSectionHeaderDirective, {read: TemplateRef}) sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef }) listCellTemplates: QueryList<any>;

  isSectionsEnabled: boolean;
  isSelectable: boolean;

  constructor() { }

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn('kirbyListItem is deprecated and will be removed in future versions of Kirby');
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
  }

  onItemClick(row: any): void {
    this.itemSelect.emit(row);
  }

  onItemTap(selectedItem: any): void {
    this.itemSelect.emit(selectedItem);
  }

  rowDefinition(headerTemplate: any): string {
    return headerTemplate ? 'auto,*' : '*' ;
  }

  rowNumberForListView(headerTemplate: any): string {
    return headerTemplate ? '1' : '0';
  }
}
