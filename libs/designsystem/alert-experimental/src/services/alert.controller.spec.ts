import { Component } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { AlertExperimentalController } from './alert.controller';

@Component({
  template: `
    <h2>Dummy Component</h2>
  `,
})
class EmbeddedDummyComponent {}

describe('AlertExperimentalController', () => {
  let spectator: SpectatorService<AlertExperimentalController>;
  let alertController: AlertExperimentalController;
  const backdropOpacity = '0.4';

  const createService = createServiceFactory({
    service: AlertExperimentalController,
    imports: [TestHelper.ionicModuleForTest],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    alertController = spectator.service;
  });

  describe('showAlert', () => {
    let ionModal: HTMLIonModalElement;
    let backdrop: HTMLIonBackdropElement;
    let ionModalController: IonicModalController;

    beforeEach(async () => {
      ionModalController = spectator.inject(IonicModalController);
      await alertController.showAlert({ title: 'Alert' });
      await TestHelper.waitForTimeout(50);
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await ionModal.dismiss();
    });

    it('alert should have correct backdrop style', async () => {
      expect(ionModal).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
    });

    it('modal wrapper should have correct max width', () => {
      const modalWrapper = ionModal.shadowRoot.querySelector('.modal-wrapper');
      expect(modalWrapper).toHaveComputedStyle({
        'max-width': DesignTokenHelper.compactModalMaxWidth(),
      });
    });
  });
});
