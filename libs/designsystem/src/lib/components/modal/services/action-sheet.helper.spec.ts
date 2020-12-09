import { Component } from '@angular/core';
import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ActionSheetHelper } from './action-sheet.helper';
import { Overlay } from './modal.interfaces';

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
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeEach(() => {
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
      backdrop = ionModal.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await overlay.dismiss();
    });

    it('action-sheet should have correct backdrop style', () => {
      const modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
      expect(modalShadow).toHaveComputedStyle({ display: 'none' });
      expect(backdrop).toHaveComputedStyle({ opacity: backdropOpacity });
    });

    it('modal wrapper should not have max width or height', () => {
      const modalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
      expect(modalWrapper).toHaveComputedStyle({ 'max-width': 'none', 'max-height': 'none' });
    });

    it('backdrop click should not dismiss action-sheet', async () => {
      let modalDidDismiss = false;
      ionModal.onDidDismiss().then((_) => (modalDidDismiss = true));
      backdrop.dispatchEvent(new MouseEvent('click'));
      await new Promise((resolve) => setTimeout(resolve, 15));
      expect(modalDidDismiss).toBeFalse();
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
      backdrop = ionModal.querySelector('ion-backdrop');
      expect(backdrop).toHaveComputedStyle({ opacity: backdropOpacity });
      await ionModalElement.dismiss();
    });
  });
});
