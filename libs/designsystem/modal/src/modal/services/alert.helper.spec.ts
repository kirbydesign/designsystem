import { Component } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular/standalone';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { Overlay } from '../../modal.interfaces';
import { AlertHelper } from './alert.helper';

@Component({
  template: `
    <h2>Dummy Component</h2>
  `,
})
class EmbeddedDummyComponent {}

describe('AlertHelper', () => {
  let spectator: SpectatorService<AlertHelper>;
  let alertHelper: AlertHelper;
  const backdropOpacity = '0.4';

  const createService = createServiceFactory({
    service: AlertHelper,
    imports: [TestHelper.ionicModuleForTest],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
  });

  beforeEach(() => {
    TestHelper.disableAnimationsInTest();
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
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await overlay.dismiss();
    });

    it('alert should have correct backdrop style', () => {
      expect(ionModal).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
    });

    it('modal wrapper should have correct max width', () => {
      const modalWrapper = ionModal.shadowRoot.querySelector('.modal-wrapper');
      expect(modalWrapper).toHaveComputedStyle({
        'max-width': DesignTokenHelper.compactModalMaxWidth(),
      });
    });

    it('alert should have correct backdrop style when opened on top of a modal', async () => {
      await overlay.dismiss();
      const ionModalElement = await ionModalController.create({
        component: EmbeddedDummyComponent,
      });
      await ionModalElement.present();
      const modalIonModal = await ionModalController.getTop();
      expect(modalIonModal).toBeTruthy();

      overlay = await alertHelper.showAlert({ title: 'Alert on top of modal' });

      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
      await ionModalElement.dismiss();
    });
  });
});
