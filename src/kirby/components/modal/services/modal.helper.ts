import { Injectable } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';
import { Animation } from '@ionic/core';

import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';
import { ModalConfigHelper } from '../modal-wrapper/config/modal-config.helper';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModalWindow(
    config: ModalConfig,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const mergedConfig = this.mergeDefaultConfig(config);
    const modal = await this.ionicModalController.create({
      component: ModalWrapperComponent,
      cssClass: 'kirby-modal',
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

    registerModal({ close: modal.dismiss.bind(modal) });

    modal.present();
    return modal.onDidDismiss();
  }

  private static animateIn(
    flavor: any,
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
    let transformYFromTo = [`${baseEl.clientHeight}px`, `0px`];
    let fadeBackdropFromTo = [0.01, 0.3];
    let fadeWrapperFromTo = [0.01, 1];

    // Define animations
    if (flavor === 'drawer') {
      // slide drawers up/down
      backdropAnimation.fromTo('opacity', fadeBackdropFromTo[0], fadeBackdropFromTo[1]);
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
      backdropAnimation.fromTo('opacity', fadeBackdropFromTo[0], fadeBackdropFromTo[1]);
      wrapperAnimation.fromTo(`opacity`, fadeWrapperFromTo[0], fadeWrapperFromTo[1]);
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
    flavor: any,
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
    let transformYFromTo = [`0px`, `${baseEl.clientHeight}px`];
    let fadeBackdropFromTo = [0.3, 0.01];
    let fadeWrapperFromTo = [1, 0.01];

    // Define animations
    if (flavor === 'drawer') {
      // slide drawers up/down
      backdropAnimation.fromTo('opacity', fadeBackdropFromTo[0], fadeBackdropFromTo[1]);
      wrapperAnimation.beforeStyles({ opacity: 1 });
      wrapperAnimation.fromTo(
        `transform`,
        `translateY(${transformYFromTo[0]})`,
        `translateY(${transformYFromTo[1]})`
      );
    } else {
      // fade modals in/out
      backdropAnimation.fromTo('opacity', fadeBackdropFromTo[0], fadeBackdropFromTo[1]);
      wrapperAnimation.fromTo(`opacity`, fadeWrapperFromTo[0], fadeWrapperFromTo[1]);
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
    const modalConfig: ModalConfig = {
      title: config.title,
      component: config.component,
      flavor: config.flavor === null ? 'modal' : config.flavor,
      dim: config.dim === null ? ModalConfigHelper.defaultDim : config.dim,
      componentProps: config.componentProps,
      drawerSupplementaryAction: config.drawerSupplementaryAction,
      enterDuration:
        config.enterDuration === null
          ? config.flavor === 'modal'
            ? KirbyAnimation.Duration.SHORT
            : KirbyAnimation.Duration.LONG
          : config.enterDuration,
      leaveDuration:
        config.leaveDuration === null
          ? config.flavor === 'modal'
            ? KirbyAnimation.Duration.SHORT
            : KirbyAnimation.Duration.LONG
          : config.leaveDuration,
      easingIn:
        config.easingIn === null
          ? config.flavor === 'modal'
            ? KirbyAnimation.Easing.STATIC
            : KirbyAnimation.Easing.ENTER
          : config.easingIn,
      easingOut:
        config.easingOut === null
          ? config.flavor === 'modal'
            ? KirbyAnimation.Easing.STATIC
            : KirbyAnimation.Easing.EXIT
          : config.easingOut,
    };
    return modalConfig;
  }
}
