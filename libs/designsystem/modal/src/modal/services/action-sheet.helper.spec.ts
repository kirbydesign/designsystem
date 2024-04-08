import { Component } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular/standalone';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { Overlay } from '../../modal.interfaces';
import { ActionSheetHelper } from './action-sheet.helper';

@Component({
  template: `
    <h2>Dummy Component</h2>
  `,
})
class EmbeddedDummyComponent {}

describe('ActionSheetHelper', () => {
  let spectator: SpectatorService<ActionSheetHelper>;
  let actionSheetHelper: ActionSheetHelper;
  const backdropOpacity = '0.4';

  const createService = createServiceFactory({
    service: ActionSheetHelper,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    TestHelper.disableAnimationsInTest();
    spectator = createService();
    actionSheetHelper = spectator.service;
  });

  describe('showActionSheet', () => {
    let overlay: Overlay;
    let ionModal: HTMLIonModalElement;
    let backdrop: HTMLIonBackdropElement;
    let ionModalController: IonicModalController;

    beforeEach(async () => {
      ionModalController = spectator.inject(IonicModalController);
      overlay = await actionSheetHelper.showActionSheet({ items: [{ text: 'Option 1', id: '1' }] });
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await overlay.dismiss();
    });

    it('action-sheet should have correct backdrop style', () => {
      expect(backdrop).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
    });

    it('modal wrapper should not have max width or height', () => {
      const modalWrapper = ionModal.shadowRoot.querySelector('.modal-wrapper');
      expect(modalWrapper).toHaveComputedStyle({ 'max-width': 'none', 'max-height': 'none' });
    });

    it('backdrop click should dismiss action-sheet', async () => {
      const onDidDismiss = ionModal.onDidDismiss();

      backdrop.dispatchEvent(new MouseEvent('click'));

      await expectAsync(onDidDismiss).toBeResolved();
    });

    it('action-sheet should have correct backdrop style when opened on top of a modal', async () => {
      await overlay.dismiss();
      const ionModalElement = await ionModalController.create({
        component: EmbeddedDummyComponent,
      });
      await ionModalElement.present();
      const modalIonModal = await ionModalController.getTop();
      expect(modalIonModal).toBeTruthy();

      overlay = await actionSheetHelper.showActionSheet({ items: [] });

      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.shadowRoot.querySelector('ion-backdrop');
      expect(backdrop).toHaveComputedStyle({ '--backdrop-opacity': backdropOpacity });
      await ionModalElement.dismiss();
    });
  });
});
