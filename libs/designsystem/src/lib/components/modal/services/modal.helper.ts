import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig, ModalFlavor } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from '../modal-wrapper/compact/modal-compact-wrapper.component';
import { Overlay } from './modal.interfaces';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { ModalAnimationBuilderService } from './modal-animation-builder.service';

@Injectable()
export class ModalHelper {
  // TODO: Make presentingElement an instance field when
  // forRoot()/singleton services has been solved:
  private static presentingElement: HTMLElement = undefined;

  constructor(
    private ionicModalController: ModalController,
    private modalAnimationBuilder: ModalAnimationBuilderService
  ) {}

  public async showModalWindow(config: ModalConfig): Promise<Overlay> {
    config.flavor = config.flavor || 'modal';
    const modalPresentingElement = await this.getPresentingElement(config.flavor);

    let currentBackdrop: HTMLIonBackdropElement;
    const topMostModal = await this.ionicModalController.getTop();
    if (topMostModal) {
      currentBackdrop = topMostModal.querySelector<HTMLIonBackdropElement>('ion-backdrop');
    }

    const enterAnimation = this.modalAnimationBuilder.enterAnimation(currentBackdrop);
    const leaveAnimation = this.modalAnimationBuilder.leaveAnimation(currentBackdrop);

    const ionModal = await this.ionicModalController.create({
      component: config.flavor === 'compact' ? ModalCompactWrapperComponent : ModalWrapperComponent,
      cssClass: [
        'kirby-overlay',
        'kirby-modal',
        config.flavor === 'drawer' ? 'kirby-drawer' : null,
        config.flavor === 'compact' ? 'kirby-modal-compact' : null,
      ],
      backdropDismiss: config.flavor === 'compact' ? false : true,
      componentProps: { config: config },
      swipeToClose: config.flavor != 'compact',
      presentingElement: modalPresentingElement,
      keyboardClose: false,
      enterAnimation,
      leaveAnimation,
    });

    await ionModal.present();

    return {
      dismiss: ionModal.dismiss.bind(ionModal),
      onWillDismiss: ionModal.onWillDismiss(),
      onDidDismiss: ionModal.onDidDismiss(),
    };
  }

  public registerPresentingElement(element: HTMLElement) {
    ModalHelper.presentingElement = element;
  }

  private async getPresentingElement(flavor?: ModalFlavor) {
    let modalPresentingElement: HTMLElement = undefined;
    if (!flavor || flavor === 'modal') {
      const topMostModal = await this.ionicModalController.getTop();
      if (!topMostModal) {
        modalPresentingElement = ModalHelper.presentingElement;
      } else if (
        !topMostModal.classList.contains('kirby-drawer') &&
        !topMostModal.classList.contains('kirby-modal-compact')
      ) {
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
