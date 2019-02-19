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
  index?: number;
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
    if (headersData.hasData) {
      headersData.data.forEach((data: KirbyCellHeader) => {
        const headerComponentRef = this.createHeaderComponent();
        headerComponentRef.instance.text = data.text;
        headerComponentRef.instance.width = data.width;
        headerComponentRef.instance.size = data.size;
        headerComponentRef.instance.horisontalAlignment =
          data.horisontalAlignment;
        this.headerTemplate.insert(headerComponentRef.hostView);
      });
    }
  }

  private getHeadersData(): { data: KirbyCellHeader[]; hasData: boolean } {
    const headers: KirbyCellHeader[] = [];
    const listCellElements = this.getListCellElements();
    let hasData = false;
    listCellElements.forEach((cellEl, index) => {
      const headerData: KirbyCellHeader = { index: index };
      this.applyDataFromElement(headerData, cellEl);
      if (headerData.text) {
        hasData = true;
      }
      headers.push(headerData);
    });
    return { data: headers, hasData: hasData };
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

  private getListCellElement(templateNodes: any[]): any {
    for (const node of templateNodes) {
      if (node.element && node.element.name === 'kirby-list-cell') {
        return node;
      }
    }
    return null;
  }

  private applyDataFromElement(header: KirbyCellHeader, listCellElement: any) {
    if (listCellElement && listCellElement.element) {
      header.text = this.getAttributeValueFromElement(
        listCellElement,
        'header'
      );
      if (header.text) {
        header.horisontalAlignment = <horisontalAlignment>(
          this.getAttributeValueFromElement(
            listCellElement,
            'horisontalAlignment'
          )
        );
        header.width = Number(
          this.getAttributeValueFromElement(listCellElement, 'width')
        );
        header.size = Number(
          this.getAttributeValueFromElement(listCellElement, 'headerSize')
        );
      }
    }
  }

  private getAttributeValueFromElement(
    listCellElement: any,
    attrName: string
  ): string {
    const attr = this.getAttribute(listCellElement.element.attrs, attrName);
    return this.getAttributeValue(attr, attrName);
  }

  private getAttribute(attrs: Array<any>, attrName: string): Array<any> {
    for (const attr of attrs) {
      if (attr.includes(attrName)) {
        return attr;
      }
    }
    return null;
  }

  /**
   * The attribute is an array of three elements. The first is empty, the second
   * is the name and the third is the value.
   * @param attr
   * @param attrName
   */
  private getAttributeValue(attr: Array<any>, attrName: string): string {
    if (attr) {
      const keyIndex = attr.indexOf(attrName);
      return attr.length >= keyIndex + 2 ? attr[keyIndex + 1] : '';
    }
    return null;
    // TODO what is this???
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
