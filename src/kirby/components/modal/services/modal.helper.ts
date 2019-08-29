import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';
import { Animation } from '@ionic/core';

import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModalWindow(
    config: ModalConfig,
    _vcRef: ViewContainerRef,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const modal = await this.ionicModalController.create({
      component: ModalWrapperComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
      enterAnimation: this.animate.bind(this, true, config.flavor),
      leaveAnimation: this.animate.bind(this, false, config.flavor),
    });

    registerModal({ close: modal.dismiss.bind(modal) });

    modal.present();
    return modal.onDidDismiss();
  }

  private animate(
    isAnimEnter: boolean,
    flavor: any,
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
    // TODO: Replace 40px with the respective kirby size
    let transformYFromTo = [`${baseEl.clientHeight}px`, `40px`];
    let fadeBackdropFromTo = [0.01, 0.3];
    let fadeWrapperFromTo = [0.01, 1];
    if (!isAnimEnter) {
      transformYFromTo.reverse();
      fadeBackdropFromTo.reverse();
      fadeWrapperFromTo.reverse();
    }

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
        .easing('easeOut')
        .duration(200)
        .add(wrapperAnimation)
        .add(backdropAnimation)
    );
  }
}
