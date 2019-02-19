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
  TemplateRef,
  ViewChild,
  AfterContentInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { ListHeaderComponent } from './list-header/list-header.component';
import { horisontalAlignment } from './service/list-format.service';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Directive({
  selector: '[kirbyListCell]'
})
export class ListCellDirective {}

@Directive({
  selector: '[kirbyListSectionHeader]'
})
export class ListSectionHeaderDirective {}

export interface KirbyCellHeader {
  text?: string;
  width?: number;
  size?: number;
  horisontalAlignment?: horisontalAlignment;
  index: number;
}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterContentInit {
  @Input() items: any[];
  @Input() getSectionName?: (item: any) => string;
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef })
  sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef })
  listCellTemplates: QueryList<any>;

  @ViewChild('header', { read: ViewContainerRef })
  headerTemplate: ViewContainerRef;

  isSectionsEnabled: boolean;
  isSelectable: boolean;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    if (this.getSectionName) {
      this.isSectionsEnabled = true;
    }
    if (this.listItemTemplate) {
      console.warn(
        'kirbyListItem is deprecated and will be removed in future versions of Kirby'
      );
    }
  }

  ngAfterContentInit() {
    this.addColumnHeaders();
  }

  private addColumnHeaders() {
    const headersData = this.getHeadersData();
    if (headersData) {
      for (let index = 0; index < this.listCellTemplates.length; index++) {
        const headerData = this.getHeaderByIndex(headersData, index);
        const headerComponentRef = this.createHeaderComponent();
        headerComponentRef.instance.text = headerData.text;
        headerComponentRef.instance.width = headerData.width;
        headerComponentRef.instance.size = headerData.size;
        headerComponentRef.instance.horisontalAlignment =
          headerData.horisontalAlignment;
        this.headerTemplate.insert(headerComponentRef.hostView);
      }
    }
  }

  private getHeadersData(): KirbyCellHeader[] {
    const headers: KirbyCellHeader[] = [];
    const listCellElements = this.getListCellElements();
    listCellElements.forEach((cellEl, index) => {
      const headerData = this.getHeaderData(cellEl, index);
      if (headerData) {
        headers.push(headerData);
      }
    });
    return headers;
  }

  private getListCellElements() {
    const listCells = [];
    this.listCellTemplates.forEach((template, index) => {
      const templateNodes: any[] = template._def.element.template.nodes;
      const listCell = this.getListCellElement(templateNodes);
      if (listCell) {
        listCells.push(listCell);
      }
    });
    return listCells;
  }

  private getHeaderByIndex(
    headersData: KirbyCellHeader[],
    index: number
  ): KirbyCellHeader {
    for (const data of headersData) {
      if (index === data.index) {
        return data;
      }
    }
    return { index: index };
  }

  private createHeaderComponent(): ComponentRef<ListHeaderComponent> {
    const listHeaderFactory = this._componentFactoryResolver.resolveComponentFactory(
      ListHeaderComponent
    );
    const listHeader = listHeaderFactory.create(
      this.headerTemplate.parentInjector
    );
    return listHeader;
  }

  private getListCellElement(templateNodes: any[]): any {
    for (const node of templateNodes) {
      if (node.element && node.element.name === 'kirby-list-cell') {
        return node;
      }
    }
    return null;
  }

  private getDataFromElement(listCellElement: any, index: number): KirbyCellHeader {
    if (listCellElement && listCellElement.element) {
      const header: KirbyCellHeader = { index: index };
      const headerAttr = this.getAttribute(
        listCellElement.element.attrs,
        'header'
      );
      if (headerAttr) {
        header.text = this.getAttributeValue(headerAttr, 'header');
        header.index = index;
        this.setValueOnHeader(header, listCellElement, 'width');
        this.setValueOnHeader(header, listCellElement, 'horisontalAlignment');
        this.setValueOnHeader(header, listCellElement, 'size');

        return header;
      }
    }
    return null;
  }

  private setValueOnHeader(
    header: KirbyCellHeader,
    listCellElement: any,
    attrName
  ) {
    const attr = this.getAttribute(listCellElement.element.attrs, attrName);
    if (attr) {
      header[attrName] = this.getAttributeValue(attr, attrName);
    }
  }

  private getAttribute(attrs: Array<any>, attrName: string): Array<any> {
    for (const attr of attrs) {
      if (attr.includes(attrName)) {
        return attr;
      }
    }
    return null;
  }

  private getAttributeValue(attr: Array<any>, attrName: string): string {
    if (attr) {
      const keyIndex = attr.indexOf(attrName);
      return attr.length >= keyIndex + 2 ? attr[keyIndex + 1] : '';
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
    return headerTemplate ? 'auto,*' : '*';
  }

  rowNumberForListView(headerTemplate: any): string {
    return headerTemplate ? '1' : '0';
  }
}
