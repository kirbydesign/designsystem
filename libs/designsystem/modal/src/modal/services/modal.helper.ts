import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WindowRef } from '@kirbydesign/designsystem/types';

import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import { Overlay } from '../../modal.interfaces';
import { AlertConfig } from '../alert/config/alert-config';

import {
  ModalCompactWrapperComponent,
  ModalConfig,
  ModalSize,
  ModalWrapperComponent,
} from '../../modal-wrapper';
import { AlertHelper } from './alert.helper';

import { ModalAnimationBuilderService } from './modal-animation-builder.service';

@Injectable()
export class ModalHelper {
  constructor(
    private ionicModalController: ModalController,
    private modalAnimationBuilder: ModalAnimationBuilderService,
    private windowRef: WindowRef,
    private alertHelper: AlertHelper
  ) {}

  /* 
    isModalOpening is used to prevent additional instantiations
    of modals, while a modal is already being instatiated, but not completed.
    This is the recommended approach by one of the maintainers of Ionic:
    https://github.com/ionic-team/ionic-framework/issues/23327#issuecomment-847028058
  */
  private isModalOpening = false;

  public async showModalWindow(config: ModalConfig, alertConfig?: AlertConfig): Promise<Overlay> {
    if (this.isModalOpening) return;

    config.flavor = config.flavor || 'modal';

    let currentBackdrop: HTMLIonBackdropElement;
    const topMostModal = await this.ionicModalController.getTop();
    if (topMostModal) {
      currentBackdrop =
        topMostModal.shadowRoot.querySelector<HTMLIonBackdropElement>('ion-backdrop');
    }

    const enterAnimation = this.modalAnimationBuilder.enterAnimation(currentBackdrop);
    const leaveAnimation = this.modalAnimationBuilder.leaveAnimation(currentBackdrop);

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

    let canDismiss: boolean | (() => Promise<boolean>) = true;
    if (alertConfig) {
      canDismiss = async () => {
        const canBeDismissed = await this.showAlert(alertConfig);
        return canBeDismissed;
      };
    }

    this.isModalOpening = true;

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
      swipeToClose: config.flavor === 'drawer',
      keyboardClose: false,
      canDismiss,
      enterAnimation,
      leaveAnimation,
    });

    if (config.interactWithBackground) {
      ionModal.onDidDismiss().then(() => {
        this.windowRef.nativeWindow.document.body.classList.remove(allow_scroll_class);
      });
    }

    await ionModal.present();

    this.isModalOpening = false;

    return {
      dismiss: ionModal.dismiss.bind(ionModal),
      onWillDismiss: ionModal.onWillDismiss(),
      onDidDismiss: ionModal.onDidDismiss(),
    };
  }

  public registerPresentingElement() {
    console.log(
      'registerPresentingElement has been deprecated. It is no longer needed to register a presenting element.'
    );
  }

  public async showAlert(config: AlertConfig): Promise<boolean> {
    const alert = await this.alertHelper.showAlert(config);
    const result = await alert.onWillDismiss;
    return result.data;
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
