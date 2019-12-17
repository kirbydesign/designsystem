import { Injectable } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';
import { Animation } from '@ionic/core';

import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';
import { ModalConfigHelper } from '../modal-wrapper/config/modal-config.helper';
import { Modal } from './modal.model';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModalWindow(
    config: ModalConfig,
    registerModal: (modal: Modal) => void
  ): Promise<any> {
    const modal: Modal = {
      close: (data?: any) => null,
      scrollToTop: () => null,
      scrollToBottom: () => null,
    };
    const mergedConfig = this.mergeDefaultConfig(config);
    mergedConfig.modal = modal;
    const ionModal = await this.ionicModalController.create({
      component: ModalWrapperComponent,
      cssClass: ['kirby-modal', config.flavor === 'drawer' ? 'kirby-drawer' : null],
      componentProps: { config: mergedConfig },
      enterAnimation: ModalHelper.animateIn.bind(
        this,
        mergedConfig.flavor,
        mergedConfig.enterDuration,
        mergedConfig.easingIn
      ),
      leaveAnimation: ModalHelper.animateOut.bind(
        this,
        mergedConfig.flavor,
        mergedConfig.leaveDuration,
        mergedConfig.easingOut
      ),
    });

    modal.close = ionModal.dismiss.bind(ionModal);
    registerModal(modal);

    ionModal.present();
    return ionModal.onDidDismiss();
  }

  private static animateIn(
    flavor: 'modal' | 'drawer',
    duration: KirbyAnimation.Duration,
    easing: KirbyAnimation.Easing,
    AnimationC: Animation,
    baseEl: HTMLElement
  ): Promise<Animation> {
    // Set-up animated elements
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperElem = baseEl.querySelector('.modal-wrapper') as HTMLElement;
    wrapperAnimation.addElement(wrapperElem);

    backdropAnimation.easing(KirbyAnimation.Easing.STATIC);
    wrapperAnimation.easing(easing);

    // Define animation transition values
    const transformYFromTo = [`${baseEl.clientHeight}px`, `0px`];
    const fadeBackdropFrom = 0.01;
    const fadeBackdropTo = 0.3;
    const fadeWrapperFrom = 0.01;
    const fadeWrapperTo = 1;

    // Define animations
    if (flavor === 'drawer') {
      // slide drawers up/down
      backdropAnimation.fromTo('opacity', fadeBackdropFrom, fadeBackdropTo);
      wrapperAnimation.beforeStyles({ opacity: 1 });
      wrapperAnimation.fromTo(
        `transform`,
        `translateY(${transformYFromTo[0]})`,
        `translateY(${transformYFromTo[1]})`
      );
    } else {
      // Reset the vertical modal placement to its starting position
      wrapperElem.style.transform = `translateY(${transformYFromTo[1]})`;
      // fade modals in/out
      backdropAnimation.fromTo('opacity', fadeBackdropFrom, fadeBackdropTo);
      wrapperAnimation.fromTo(`opacity`, fadeWrapperFrom, fadeWrapperTo);
    }

    // Run animations
    return Promise.resolve(
      baseAnimation
        .addElement(baseEl)
        .duration(duration)
        .add(wrapperAnimation)
        .add(backdropAnimation)
    );
  }

  private static animateOut(
    flavor: 'modal' | 'drawer',
    duration: KirbyAnimation.Duration,
    easing: KirbyAnimation.Easing,
    AnimationC: Animation,
    baseEl: HTMLElement
  ): Promise<Animation> {
    // Set-up animated elements
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperElem = baseEl.querySelector('.modal-wrapper') as HTMLElement;
    wrapperAnimation.addElement(wrapperElem);

    backdropAnimation.easing(KirbyAnimation.Easing.STATIC);
    wrapperAnimation.easing(easing);

    // Define animation transition values
    const transformYFromTo = [`0px`, `${baseEl.clientHeight}px`];
    const fadeBackdropFrom = 0.3;
    const fadeBackdropTo = 0.01;
    const fadeWrapperFrom = 1;
    const fadeWrapperTo = 0.01;

    // Define animations
    if (flavor === 'drawer') {
      // slide drawers up/down
      backdropAnimation.fromTo('opacity', fadeBackdropFrom, fadeBackdropTo);
      wrapperAnimation.beforeStyles({ opacity: 1 });
      wrapperAnimation.fromTo(
        `transform`,
        `translateY(${transformYFromTo[0]})`,
        `translateY(${transformYFromTo[1]})`
      );
    } else {
      // fade modals in/out
      backdropAnimation.fromTo('opacity', fadeBackdropFrom, fadeBackdropTo);
      wrapperAnimation.fromTo(`opacity`, fadeWrapperFrom, fadeWrapperTo);
    }

    // Run animations
    return Promise.resolve(
      baseAnimation
        .addElement(baseEl)
        .duration(duration)
        .add(wrapperAnimation)
        .add(backdropAnimation)
    );
  }

  public blurNativeWrapper(nativeElement: HTMLElement) {
    if (nativeElement) {
      setTimeout(() => {
        nativeElement.focus();
        nativeElement.blur();
      }, 50);
    }
  }

  private mergeDefaultConfig(config: ModalConfig): ModalConfig {
    let defaults;

    if (config.flavor === 'drawer') {
      defaults = {
        enterDuration: KirbyAnimation.Duration.LONG,
        leaveDuration: KirbyAnimation.Duration.LONG,
        easingIn: KirbyAnimation.Easing.ENTER,
        easingOut: KirbyAnimation.Easing.EXIT,
      };
    } else {
      defaults = {
        flavor: 'modal',
        dim: ModalConfigHelper.defaultDim,
        enterDuration: KirbyAnimation.Duration.SHORT,
        leaveDuration: KirbyAnimation.Duration.SHORT,
        easingIn: KirbyAnimation.Easing.STATIC,
        easingOut: KirbyAnimation.Easing.STATIC,
      };
    }

    return { ...defaults, ...config };
  }
}
