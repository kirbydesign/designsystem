import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';

import { ModalController as IonicModalController } from '@ionic/angular/standalone';
import { ModalNavigationService } from '../../modal-navigation.service';
import { ModalController } from './modal.controller';

export const CanDismissModalGuard: CanDeactivateFn<unknown> = async <T>(
  _component: T,
  _currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  const modalNavService = inject(ModalNavigationService);
  const currentRouteIsModal = modalNavService.isModalRoute(currentState.url);
  const nextRouteIsModal = modalNavService.isModalRoute(nextState.url);

  const isNavigatingWithinModal = currentRouteIsModal && nextRouteIsModal;
  if (isNavigatingWithinModal) {
    return true;
  }

  const modalController = inject(ModalController);
  const topMostModal = modalController.getTopMost();
  if (topMostModal) {
    if (topMostModal.isDismissing) {
      return true;
    }
    return topMostModal.dismiss();
  } else {
    // Declarative modals are not created through Kirby Modalcontroller, let's try Ionic:
    const ionicModalController = inject(IonicModalController);
    const ionModal = await ionicModalController.getTop();
    if (ionModal) {
      return ionModal.dismiss();
    }
  }

  return true;
};
