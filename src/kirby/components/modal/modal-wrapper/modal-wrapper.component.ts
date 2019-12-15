import { Component, HostListener, Injector, HostBinding, Input, ViewChild } from '@angular/core';
import { NavParams, IonContent } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { IModalController } from '../services/modal.controller.interface';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';

@Component({
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent {
  scrollY: number = Math.abs(window.scrollY);
  config: ModalConfig;
  componentPropsInjector: Injector;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;

  @HostBinding('class.drawer')
  private get _isDrawer() {
    return this.config.flavor === 'drawer';
  }

  constructor(params: NavParams, private modalController: IModalController, injector: Injector) {
    this.config = params.get('config');
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.config.componentProps }],
      parent: injector,
    });

    modalController.scrollToTop = this.scrollToTop.bind(this);
    modalController.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration || 0);
  }

  scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration || 0);
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

  // This prevents Ionic from setting --keyboard-offset on ion-content inside modal:
  @HostListener('focusin', ['$event'])
  @HostListener('focusout', ['$event'])
  checkFocusTarget(event: FocusEvent) {
    const input = event.target as HTMLElement;
    if (input.tagName === 'INPUT' && input.closest('ion-modal')) {
      event.stopPropagation();
    }
  }
}
