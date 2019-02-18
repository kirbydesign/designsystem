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
  width?: string;
  horisontalAlignment?: string;
  verticalAlignment?: string;
}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterContentInit {
  @Input() items: any[];
  @Output() itemSelect = new EventEmitter<any>();
  @Input() getSectionName?: (item: any) => string;

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef })
  sectionHeaderTemplate;
  @ContentChildren(ListCellDirective, { read: TemplateRef })
  listCellTemplates: QueryList<any>;

  @ViewChild('header', { read: ViewContainerRef })
  headerTemplate: ViewContainerRef;

  isSectionsEnabled: boolean;

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
    const headerComponentRef = this.createHeaderComponent();

    this.listCellTemplates.forEach(template => {
      const templateNodes: any[] = template._def.element.template.nodes;
      const listCellElement = this.getListCellElement(templateNodes);
      const header = this.getHeader(listCellElement);
      if (header) {
        headerComponentRef.instance.text = header.text;
        this.headerTemplate.insert(headerComponentRef.hostView);
      }
    });
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

  private getHeader(listCellElement: any): KirbyCellHeader {
    if (listCellElement && listCellElement.element) {
      const header: KirbyCellHeader = {};
      const headerAttr = this.getAttribute(
        listCellElement.element.attrs,
        'header'
      );
      if (headerAttr) {
        header.text = this.getAttributeValue(headerAttr, 'header');

        this.setValueOnHeader(header, listCellElement, 'width');
        this.setValueOnHeader(header, listCellElement, 'horisontalAlignment');
        this.setValueOnHeader(header, listCellElement, 'verticalAlignment');

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
