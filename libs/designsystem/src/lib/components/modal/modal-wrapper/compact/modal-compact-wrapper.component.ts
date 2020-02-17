import { Component, HostListener, Injector, HostBinding } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ModalConfig } from '../config/modal-config';
import { COMPONENT_PROPS } from '../config/modal-config.helper';
import { Modal } from '../../services/modal.model';

@Component({
  selector: 'kirby-modal-compact-wrapper',
  templateUrl: './modal-compact-wrapper.component.html',
  styleUrls: ['./modal-compact-wrapper.component.scss'],
})
export class ModalCompactWrapperComponent {
  scrollY: number = Math.abs(window.scrollY);
  config: ModalConfig;
  componentPropsInjector: Injector;

  private _ionPageReset = false;
  @HostBinding('class.ion-page')
  get ionPageReset() {
    return this._ionPageReset;
  }

  constructor(params: NavParams, injector: Injector) {
    this.config = params.get('config');
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: injector,
    });
    this.registerScrolling(this.config.modal);
  }

  private registerScrolling(modal: Modal) {
    modal.scrollToTop = () => {};
    modal.scrollToBottom = () => {};
  }

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    window.scrollTo({ top: this.scrollY });
  }
}
