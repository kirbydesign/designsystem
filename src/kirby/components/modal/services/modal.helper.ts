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
    conf: ModalConfig,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const config: ModalConfig = {
      title: conf.title,
      component: conf.component,
      flavor: conf.flavor,
      dim: conf.dim == null ? ModalConfigHelper.defaultDim : conf.dim,
      componentProps: conf.componentProps,
      drawerSupplementaryAction: conf.drawerSupplementaryAction,
      durationIn: conf.durationIn == null ? KirbyAnimation.Duration.SHORT : conf.durationIn,
      durationOut: conf.durationOut == null ? KirbyAnimation.Duration.SHORT : conf.durationOut,
    };
    const modal = await this.ionicModalController.create({
      component: ModalWrapperComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
      enterAnimation: this.animateIn.bind(this, config.flavor, config.durationIn),
      leaveAnimation: this.animateOut.bind(this, config.flavor, config.durationOut),
    });

    registerModal({ close: modal.dismiss.bind(modal) });

    modal.present();
    return modal.onDidDismiss();
  }

  private animateIn(
    flavor: any,
    duration: KirbyAnimation.Duration,
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
        .easing('ease-in')
        .duration(duration)
        .add(wrapperAnimation)
        .add(backdropAnimation)
    );
  }

  private animateOut(
    flavor: any,
    duration: KirbyAnimation.Duration,
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
        .easing('ease-out')
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
}
