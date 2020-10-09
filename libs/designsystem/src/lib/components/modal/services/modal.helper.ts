import { Injectable } from '@angular/core';
import { Animation, AnimationBuilder, AnimationController, ModalController } from '@ionic/angular';

import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from '../modal-wrapper/compact/modal-compact-wrapper.component';
import { Overlay } from './modal.interfaces';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { DesignTokenHelper } from '../../../helpers';

@Injectable()
export class ModalHelper {
  // TODO: Make presentingElement an instance field when
  // forRoot()/singleton services has been solved:
  private static presentingElement: HTMLElement = undefined;

  constructor(
    private ionicModalController: ModalController,
    private animationCtrl: AnimationController
  ) {}

  public async showModalWindow(config: ModalConfig): Promise<Overlay> {
    config.flavor = config.flavor || 'modal';
    const modalPresentingElement = await this.getPresentingElement(config.flavor);

    let currentBackdrop: HTMLIonBackdropElement;
    const topMostModal = await this.ionicModalController.getTop();
    if (topMostModal) {
      currentBackdrop = topMostModal.querySelector<HTMLIonBackdropElement>('ion-backdrop');
    }

    const enterAnimation = this.enterAnimationBuilder(currentBackdrop);
    const leaveAnimation = this.leaveAnimationBuilder(currentBackdrop);

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
      enterAnimation,
      leaveAnimation,
      keyboardClose: false,
    });

    await ionModal.present();

    return { dismiss: ionModal.dismiss.bind(ionModal), onDidDismiss: ionModal.onDidDismiss() };
  }

  // TODO: Move to own class/file:
  private readonly modalAnimationEasing = 'cubic-bezier(0.32,0.72,0,1)';
  private readonly modalAnimationDuration = KirbyAnimation.Duration.LONG;

  // TODO: Move to own class/file:
  private enterAnimationBuilder(currentBackdrop?: HTMLIonBackdropElement): AnimationBuilder {
    return (baseEl: HTMLElement, presentingEl?: HTMLElement): Animation => {
      const animations = [];
      if (currentBackdrop) {
        console.log('Adding fadeOutAnim to currentBackdrop...');
        const currentBackdropAnimation = this.animationCtrl
          .create()
          .addElement(currentBackdrop)
          .fromTo('opacity', 'var(--backdrop-opacity)', 0.01);
        animations.push(currentBackdropAnimation);
      }

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('.modal-wrapper')!)
        .beforeStyles({ opacity: 1 })
        .fromTo('transform', 'translateY(100%)', 'translateY(0%)');

      const baseAnimation = this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing(this.modalAnimationEasing)
        .duration(this.modalAnimationDuration)
        .beforeAddClass('show-modal')
        .addAnimation([...animations, backdropAnimation, wrapperAnimation]);

      return baseAnimation;
    };
  }

  // TODO: Move to own class/file:
  private leaveAnimationBuilder(currentBackdrop?: HTMLIonBackdropElement): AnimationBuilder {
    return (baseEl: HTMLElement, presentingEl?: HTMLElement): Animation => {
      const animations = [];
      if (currentBackdrop) {
        const currentBackdropAnimation = this.animationCtrl
          .create()
          .addElement(currentBackdrop)
          .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
          .afterStyles({ opacity: 'var(--backdrop-opacity)' });
        animations.push(currentBackdropAnimation);
      }

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('.modal-wrapper')!)
        .beforeStyles({ opacity: 1 })
        .fromTo('transform', 'translateY(0%)', 'translateY(100%)');

      const baseAnimation = this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing(this.modalAnimationEasing)
        .duration(this.modalAnimationDuration)
        .addAnimation([...animations, backdropAnimation, wrapperAnimation]);

      return baseAnimation;
    };
  }

  public registerPresentingElement(element: HTMLElement) {
    ModalHelper.presentingElement = element;
  }

  private async getPresentingElement(flavor?: string) {
    let modalPresentingElement: HTMLElement = undefined;
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
