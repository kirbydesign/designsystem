import { Component } from '@angular/core';
import { registerElement } from 'nativescript-angular';
import { ContentView } from 'tns-core-modules/ui/content-view';

const MODAL_COMPONENT_SELECTOR = 'kirby-modal';

@Component({
  selector: MODAL_COMPONENT_SELECTOR,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends ContentView {
  constructor() {
    super();
  }
}

registerElement(MODAL_COMPONENT_SELECTOR, () => require('./modal.component').ModalComponent);
