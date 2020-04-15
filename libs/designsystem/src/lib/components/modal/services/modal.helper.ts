import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from '../modal-wrapper/compact/modal-compact-wrapper.component';
import { Modal } from './modal.model';

@Injectable()
export class ModalHelper {
  private presentingElement: HTMLElement;

  constructor(private ionicModalController: ModalController) {}

  public async showModalWindow(
    config: ModalConfig,
    registerModal: (modal: Modal) => void
  ): Promise<any> {
    const modal: Modal = {
      close: (data?: any) => null,
      scrollToTop: () => null,
      scrollToBottom: () => null,
    };
    config.modal = modal;
    let modalPresentingElement = await this.getPresentingElement(config.flavor);
    const ionModal = await this.ionicModalController.create({
      component: config.flavor === 'compact' ? ModalCompactWrapperComponent : ModalWrapperComponent,
      cssClass: [
        'kirby-modal',
        config.flavor === 'drawer' ? 'kirby-drawer' : null,
        config.flavor === 'compact' ? 'kirby-modal-compact' : null,
      ],
      backdropDismiss: config.flavor === 'compact' ? false : true,
      componentProps: { config: config },
      swipeToClose: config.flavor != 'compact',
      presentingElement: modalPresentingElement,
    });

    modal.close = ionModal.dismiss.bind(ionModal);
    registerModal(modal);

    ionModal.present();
    return ionModal.onDidDismiss();
  }

  public blurNativeWrapper(nativeElement: HTMLElement) {
    if (nativeElement) {
      setTimeout(() => {
        nativeElement.focus();
        nativeElement.blur();
      }, 50);
    }
  }

  public registerPresentingElement(element: HTMLElement) {
    this.presentingElement = element;
  }

  private async getPresentingElement(flavor?: string) {
    let modalPresentingElement: HTMLElement;
    if (!flavor || flavor === 'modal') {
      const topMostModal = await this.ionicModalController.getTop();
      if (!topMostModal) {
        modalPresentingElement = this.presentingElement;
      } else if (!topMostModal.classList.contains('kirby-drawer')) {
        modalPresentingElement = topMostModal;
      }
    }
    return modalPresentingElement;
  }
}
