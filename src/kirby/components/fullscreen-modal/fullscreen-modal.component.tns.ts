import { Component } from '@angular/core';
import { registerElement } from 'nativescript-angular';

const FULLSCREEN_MODAL_COMPONENT_SELECTOR = 'kirby-fullscreen-modal';

@Component({
  selector: FULLSCREEN_MODAL_COMPONENT_SELECTOR,
  templateUrl: './fullscreen-modal.component.html',
  styleUrls: ['./fullscreen-modal.component.scss'],
})
export class FullscreenModalComponent {}

registerElement(
  FULLSCREEN_MODAL_COMPONENT_SELECTOR,
  () => require('./fullscreen-modal.component').FullscreenModalComponent
);
