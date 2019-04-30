import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { ModalConfigHelper } from './config/modal-config.helper';
import { IModalController } from './services/modal.controller.interface';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalWrapper') modalWrapper: ElementRef;
  scrollY: number = Math.abs(window.scrollY);
  config: ModalConfig;

  constructor(
    private params: NavParams,
    private modalController: IModalController,
    private renderer: Renderer2
  ) {
    this.config = ModalConfigHelper.processOptionalValues(this.params.get('config'));
  }

  ngAfterViewInit(): void {
    // TODO: need to get the height of the calling element (perhaps the vcRef could be useful)
    // and scroll to it with e.g. Math.abs(window.scrollY)
    const el = this.modalWrapper.nativeElement;
    setTimeout(() => {
      el.focus();
      el.blur();
    }, 50);
  }

  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing
    window.scrollTo({ top: this.scrollY });
  }

  onModalDismiss(e: any) {
    // Handle key press, due to:
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    if (e && e.keyCode !== 32 && e.keyCode !== 13) {
      return;
    }
    this.modalController.hideModal();
  }
}
