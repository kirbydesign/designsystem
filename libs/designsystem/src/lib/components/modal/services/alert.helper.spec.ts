import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignTokenHelper } from '../../../helpers';

import { WindowRef } from '../../../types/window-ref';
import { AlertHelper } from './alert.helper';
import { ModalHelper } from './modal.helper';
import { Overlay } from './modal.interfaces';
import { ModalNavigationService } from './modal-navigation.service';

describe('AlertHelper', () => {
  let spectator: SpectatorService<AlertHelper>;
  let alertHelper: AlertHelper;
  const backdropOpacity = '0.4';

  const createService = createServiceFactory({
    service: AlertHelper,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true }), RouterTestingModule],
    providers: [
      ModalHelper,
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    alertHelper = spectator.service;
  });

  describe('showAlert', () => {
    let overlay: Overlay;
    let ionModal: HTMLIonModalElement;
    let backdrop: HTMLIonBackdropElement;
    let ionModalController: IonicModalController;

    beforeEach(async () => {
      ionModalController = spectator.inject(IonicModalController);
      overlay = await alertHelper.showAlert({ title: 'Alert' });
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await overlay.dismiss();
    });

    it('alert should have correct backdrop style', () => {
      const modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
      expect(modalShadow).toHaveComputedStyle({ display: 'none' });
      expect(backdrop).toHaveComputedStyle({ opacity: backdropOpacity });
    });

    it('modal wrapper should have correct max width', () => {
      const modalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
      expect(modalWrapper).toHaveComputedStyle({
        'max-width': DesignTokenHelper.compactModalMaxWidth(),
      });
    });

    it('alert should have correct backdrop style when opened on top of a modal', async () => {
      await overlay.dismiss();
      const modalHelper = spectator.inject(ModalHelper);
      const modalOverlay = await modalHelper.showModalWindow({
        title: 'Modal',
        component: undefined,
      });
      const modalIonModal = await ionModalController.getTop();
      expect(modalIonModal).toBeTruthy();
      overlay = await alertHelper.showAlert({ title: 'Alert on top of modal' });
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.querySelector('ion-backdrop');
      expect(backdrop).toHaveComputedStyle({ opacity: backdropOpacity });
      await modalOverlay.dismiss();
    });
  });
});
