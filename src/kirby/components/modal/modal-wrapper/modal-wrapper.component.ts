import { Component, ElementRef, ViewChild, Injector, HostListener } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { IModalController } from '../services/modal.controller.interface';

@Component({
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent {
  @ViewChild('modalWrapper', { static: true }) modalWrapper: ElementRef;
  scrollY: number = Math.abs(window.scrollY);
  config: ModalConfig;
  componentPropsInjector: Injector;

  constructor(
    private params: NavParams,
    private modalController: IModalController,
    injector: Injector
  ) {
    this.config = this.params.get('config');
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.params.get('config').componentProps }],
      parent: injector,
    });
  }

  @HostListener('window:focus')
  @HostListener('window:focusout')
  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing backwards (with shift+tab):
    window.scrollTo({ top: this.scrollY });
  }

  onClose() {
    this.modalController.hideTopmost();
  }
}
