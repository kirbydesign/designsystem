import { Component, Input, OnInit } from '@angular/core';
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
export class FloatingActionButtonComponent extends ContentView implements OnInit {
  @Input() showShadow?: boolean = true;
  @Input() disabled?: boolean = false;
  @Input() isFloating?: boolean = true;

  elevation: number = 8;

  view: View;

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.showShadow || this.disabled || !this.isFloating) {
      this.elevation = null;
    }
  }
}

registerElement(
  FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
  () => require('./floating-action-button.component').FloatingActionButtonComponent
);
