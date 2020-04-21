import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from '../modal-wrapper/compact/modal-compact-wrapper.component';
import { IModal } from './modal.model';
import { KirbyAnimation } from '../../../animation/kirby-animation';

@Injectable()
export class ModalHelper {
  // TODO: Make presentingElement an instance field when
  // forRoot()/singleton services has been solved:
  private static presentingElement: HTMLElement = null;

  constructor(private ionicModalController: ModalController) {}

  public async showModalWindow(config: ModalConfig): Promise<IModal> {
    config.flavor = config.flavor || 'modal';
    let modalPresentingElement = await this.getPresentingElement(config.flavor);
    const ionModal = await this.ionicModalController.create({
      component: config.flavor === 'compact' ? ModalCompactWrapperComponent : ModalWrapperComponent,
      cssClass: [
        'kirby-modal',
        config.flavor === 'drawer' ? 'kirby-drawer' : null,
        config.flavor === 'compact' ? 'kirby-modal-compact' : null,
      ],
      backdropDismiss: config.flavor === 'compact' ? false : true,
      componentProps: { config: config.componentProps },
      swipeToClose: config.flavor != 'compact',
      presentingElement: modalPresentingElement,
    });

    await ionModal.present();

    return { close: ionModal.dismiss.bind(ionModal), onClose: ionModal.onDidDismiss() };
  }

  public registerPresentingElement(element: HTMLElement) {
    ModalHelper.presentingElement = element;
  }

  private async getPresentingElement(flavor?: string) {
    let modalPresentingElement: HTMLElement;
    if (!flavor || flavor === 'modal') {
      const topMostModal = await this.ionicModalController.getTop();
      if (!topMostModal) {
        modalPresentingElement = ModalHelper.presentingElement;
      } else if (!topMostModal.classList.contains('kirby-drawer')) {
        modalPresentingElement = topMostModal;
      }
    }
    return modalPresentingElement;
  }

  public async scrollToTop(
    noModalRegisteredErrorMessage: string,
    duration?: KirbyAnimation.Duration
  ) {
    const modal = await this.ionicModalController.getTop();
    if (!modal || !(modal.component instanceof ModalWrapperComponent)) {
      throw new Error(noModalRegisteredErrorMessage);
    }
    modal.component.scrollToTop(duration);
  }

  public async scrollToBottom(
    noModalRegisteredErrorMessage: string,
    duration?: KirbyAnimation.Duration
  ) {
    const modal = await this.ionicModalController.getTop();
    if (!modal || !(modal.component instanceof ModalWrapperComponent)) {
      throw new Error(noModalRegisteredErrorMessage);
    }
    modal.component.scrollToBottom(duration);
  }
}
