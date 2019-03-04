import { Component, Input } from '@angular/core';
import { registerElement } from 'nativescript-angular';
import { ContentView } from 'tns-core-modules/ui/content-view';

const LIST_CELL_LINE_COMPONENT_SELECTOR = 'kirby-list-cell-line';

@Component({
  selector: LIST_CELL_LINE_COMPONENT_SELECTOR,
  templateUrl: './list-cell-line.component.html',
  styleUrls: ['./list-cell-line.component.scss'],
})
export class ListCellLineComponent extends ContentView {
  @Input()
  text: string;

  @Input()
  primary: boolean;

  constructor() {
    super();
    this.primary = false;
  }
}

registerElement(
  LIST_CELL_LINE_COMPONENT_SELECTOR,
  () => require('./list-cell-line.component').ListCellLineComponent
);
