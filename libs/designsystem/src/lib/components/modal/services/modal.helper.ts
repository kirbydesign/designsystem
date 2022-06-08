import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { WindowRef } from '../../../types/window-ref';
import { ModalCompactWrapperComponent } from '../modal-wrapper/compact/modal-compact-wrapper.component';
import { ModalConfig, ModalFlavor, ModalSize } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

import { Overlay } from './modal.interfaces';

@Injectable()
export class ModalHelper {
  // TODO: Make presentingElement an instance field when
  // forRoot()/singleton services has been solved:
  private static presentingElement: HTMLElement = undefined;

  constructor(private ionicModalController: ModalController, private windowRef: WindowRef) {}

  public async showModalWindow(config: ModalConfig): Promise<Overlay> {
    config.flavor = config.flavor || 'modal';
    const modalPresentingElement = await this.getPresentingElement(config.flavor);

    const defaultModalSize: ModalSize = config.flavor === 'modal' ? 'medium' : null;
    const modalSize = config.size || defaultModalSize;
    const allow_scroll_class = 'allow-background-scroll';

    let customCssClasses = [];
    if (config.cssClass) {
      customCssClasses = Array.isArray(config.cssClass) ? config.cssClass : [config.cssClass];
    }

    if (config.interactWithBackground) {
      this.windowRef.nativeWindow.document.body.classList.add(allow_scroll_class);
    }

    const ionModal = await this.ionicModalController.create({
      component: config.flavor === 'compact' ? ModalCompactWrapperComponent : ModalWrapperComponent,
      cssClass: [
        'kirby-overlay',
        'kirby-modal',
        config.flavor === 'drawer' ? 'kirby-drawer' : null,
        config.flavor === 'compact' ? 'kirby-modal-compact' : null,
        modalSize ? 'kirby-modal-' + modalSize : null,
        config.interactWithBackground ? 'interact-with-background' : null,
        ...customCssClasses,
      ],
      backdropDismiss: config.flavor === 'compact' || config.interactWithBackground ? false : true,
      showBackdrop: !config.interactWithBackground,
      componentProps: { config: config },
      swipeToClose: config.flavor != 'compact',
      presentingElement: modalPresentingElement,
      keyboardClose: false,
    });

    if (config.interactWithBackground) {
      ionModal.onDidDismiss().then(() => {
        this.windowRef.nativeWindow.document.body.classList.remove(allow_scroll_class);
      });
    }

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
