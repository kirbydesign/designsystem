import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { filter, skipUntil, takeUntil } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { Overlay } from '../../modal.interfaces';
import {
  ModalCompactWrapperComponent,
  ModalConfig,
  ModalSize,
  ModalWrapperComponent,
} from '../../modal-wrapper';
import { AlertConfig } from '../alert/config/alert-config';

import { ModalAnimationBuilderService } from './modal-animation-builder.service';
import { CanDismissHelper } from './can-dismiss.helper';

@Injectable()
export class ModalHelper {
  constructor(
    private ionicModalController: ModalController,
    private modalAnimationBuilder: ModalAnimationBuilderService,
    private windowRef: WindowRef,
    private canDismissHelper: CanDismissHelper,
    private router: Router
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

    const defaultModalSize: ModalSize = config.interactWithBackground ? null : 'medium';
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

    if (config.canDismiss) {
      canDismiss = this.canDismissHelper.getCanDismissCallback(config.canDismiss);
    }

    // This functionality is kept to prevent breaking changes, but should be depracated in the next major.
    // It will be replaced by the new 'config.canDismiss' callback
    if (alertConfig) {
      console.warn(
        "This way of passing an alertConfig to the modal will be deprecated in the next major version. We recommend using the 'config.canDismiss' callback instead."
      );

      // Remembers the modal dismissal response from user to prevent multiple alerts on
      // approval since the callback is invoked more than once when closing.
      let canBeDismissed = false;
      canDismiss = async () => {
        if (!canBeDismissed) {
          canBeDismissed = await this.canDismissHelper.showAlert(alertConfig);
        }

        return canBeDismissed;
      };
    }

    this.isModalOpening = true;

    const ionModal = await this.ionicModalController.create({
      component: config.flavor === 'compact' ? ModalCompactWrapperComponent : ModalWrapperComponent,
      cssClass: [
        'kirby-overlay',
        'kirby-modal',
        modalSize ? `kirby-modal-${modalSize}` : null,
        config.flavor === 'drawer' ? 'kirby-drawer' : null,
        config.flavor === 'compact' ? 'kirby-modal-compact' : null,
        config.interactWithBackground ? 'interact-with-background' : null,
        ...customCssClasses,
      ],
      backdropDismiss: config.flavor === 'compact' || config.interactWithBackground ? false : true,
      showBackdrop: !config.interactWithBackground,
      componentProps: { config: config },
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

    if (config.customHeight) {
      ionModal.style.setProperty('--kirby-modal-height', config.customHeight);
    }

    const onWillDismiss = ionModal.onWillDismiss();

    const overlay: Overlay = {
      dismiss: ionModal.dismiss.bind(ionModal),
      onWillDismiss,
      onDidDismiss: ionModal.onDidDismiss(),
      isDismissing: false,
    };

    onWillDismiss.then(() => {
      overlay.isDismissing = true;
    });

    await ionModal.present();

    /**
     * Due to somewhat unexpected behavior of the ion-modal not being focused when keyboardClose
     * is set to false we manually focus it, but only if focus is not already inside the modal
     * See here: https://github.com/ionic-team/ionic-framework/issues/28775#issuecomment-1875475739
     */
    const focusedElementWithinModal = ionModal.contains(document.activeElement);
    if (!focusedElementWithinModal) {
      ionModal.focus();
    }

    // Back button should only be handled manually
    // if the modal is not instantiated through a route.
    if (!config.modalRoute) {
      this.handleBrowserBackButton(overlay);
    }

    this.isModalOpening = false;

    return overlay;
  }

  private handleBrowserBackButton(overlay: Overlay) {
    const popstateNavigationStart$ = this.router.events.pipe(
      filter(
        (event): event is NavigationStart =>
          event instanceof NavigationStart && event.navigationTrigger === 'popstate'
      )
    );
    const navigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navigationEnd$
      .pipe(skipUntil(popstateNavigationStart$), takeUntil(overlay.onWillDismiss))
      .subscribe(() => {
        overlay.dismiss();
      });
  }
}
