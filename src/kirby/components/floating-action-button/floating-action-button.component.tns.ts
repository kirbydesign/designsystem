import { Component, Input } from '@angular/core';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { View } from 'tns-core-modules/ui/page/page';
import { registerElement } from 'nativescript-angular';

const FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR = 'kirby-floating-action-button';
declare var require: any;

@Component({
  selector: FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})
export class FloatingActionButtonComponent extends ContentView {
  @Input() showShadow?: boolean = true;
  @Input() disabled?: boolean = false;
  @Input() isFloating?: boolean = true;

  view: View;

  constructor() {
    super();
  }

  getElevation() {
    if (!this.showShadow || this.disabled || !this.isFloating) {
      return null;
    }
    return 'z8';
  }
}

registerElement(
  FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
  () => require('./floating-action-button.component').FloatingActionButtonComponent
);
