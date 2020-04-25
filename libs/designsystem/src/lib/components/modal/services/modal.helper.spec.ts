import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createService } from '@ngneat/spectator';

import { TestHelper } from '../../../testing/test-helper';
import { ModalHelper } from './modal.helper';
import { Overlay } from './modal.interfaces';

describe('ModalHelper', () => {
  let modalHelper: ModalHelper;
  const backdropOpacity = '0.4';
  const ionicTransparentBackdropOpacity = '0.01';

  const spectator = createService({
    service: ModalHelper,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeEach(() => {
    modalHelper = spectator.service;
  });

  describe('showModalWindow', () => {
    let overlay: Overlay;
    let ionModal: HTMLIonModalElement;
    let backdrop: HTMLIonBackdropElement;
    let ionModalController: IonicModalController;

    beforeEach(async () => {
      ionModalController = spectator.inject(IonicModalController);
      overlay = await modalHelper.showModalWindow({ title: 'Modal 1', component: undefined });
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
    });

    afterEach(async () => {
      await overlay.dismiss();
    });

    it('modal should have correct backdrop style', () => {
      expect(backdrop).toHaveComputedStyle({ opacity: backdropOpacity });
    });

    it('modal should have correct backdrop style when opened on presenting element', async () => {
      await overlay.dismiss();
      modalHelper.registerPresentingElement(window.document.body);
      overlay = await modalHelper.showModalWindow({
        title: 'Modal On Presenting Element',
        component: undefined,
      });
      ionModal = await ionModalController.getTop();
      expect(ionModal).toBeTruthy();
      backdrop = ionModal.querySelector('ion-backdrop');
      expect(backdrop).toBeTruthy();
      expect(backdrop).toHaveComputedStyle({ opacity: backdropOpacity });
    });

    it('modal should have no visible backdrop when opened on another modal', async () => {
      const secondOverlay = await modalHelper.showModalWindow({
        title: 'Modal 2',
        component: undefined,
      });
      const secondIonModal = await ionModalController.getTop();
      expect(secondIonModal).toBeTruthy();
      const secondBackdrop = secondIonModal.querySelector('ion-backdrop');
      expect(secondBackdrop).toBeTruthy();
      expect(secondBackdrop).toHaveComputedStyle({ opacity: '0' });
      await secondOverlay.dismiss();
    });

    it('drawer should have no visible backdrop when opened on another modal', async () => {
      const secondOverlay = await modalHelper.showModalWindow({
        title: 'Modal 2',
        component: undefined,
        flavor: 'drawer',
      });
      const secondIonModal = await ionModalController.getTop();
      expect(secondIonModal).toBeTruthy();
      const secondBackdrop = secondIonModal.querySelector('ion-backdrop');
      expect(secondBackdrop).toBeTruthy();
      expect(secondBackdrop).toHaveComputedStyle({ opacity: '0' });
      await secondOverlay.dismiss();
    });
  });

  describe('on small screens', () => {
    describe('showModalWindow', () => {
      let overlay: Overlay;
      let ionModal: HTMLIonModalElement;
      let backdrop: HTMLIonBackdropElement;
      let ionModalController: IonicModalController;

      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      beforeEach(async () => {
        ionModalController = spectator.inject(IonicModalController);
        overlay = await modalHelper.showModalWindow({ title: 'Modal 1', component: undefined });
        ionModal = await ionModalController.getTop();
        expect(ionModal).toBeTruthy();
        backdrop = ionModal.querySelector('ion-backdrop');
        expect(backdrop).toBeTruthy();
      });

      afterEach(async () => {
        await overlay.dismiss();
      });

      it('modal should have correct backdrop style', () => {
        expect(backdrop).toHaveComputedStyle({ opacity: ionicTransparentBackdropOpacity });
      });

      it('modal should have correct backdrop style when opened on presenting element', async () => {
        await overlay.dismiss();
        modalHelper.registerPresentingElement(window.document.body);
        overlay = await modalHelper.showModalWindow({
          title: 'Modal On Presenting Element',
          component: undefined,
        });
        ionModal = await ionModalController.getTop();
        expect(ionModal).toBeTruthy();
        backdrop = ionModal.querySelector('ion-backdrop');
        expect(backdrop).toBeTruthy();
        expect(backdrop).toHaveComputedStyle({ opacity: ionicTransparentBackdropOpacity });
      });

      it('modal should have no visible backdrop when opened on another modal', async () => {
        const secondOverlay = await modalHelper.showModalWindow({
          title: 'Modal 2',
          component: undefined,
        });
        const secondIonModal = await ionModalController.getTop();
        expect(secondIonModal).toBeTruthy();
        const secondBackdrop = secondIonModal.querySelector('ion-backdrop');
        expect(secondBackdrop).toBeTruthy();
        expect(secondBackdrop).toHaveComputedStyle({ opacity: ionicTransparentBackdropOpacity });
        await secondOverlay.dismiss();
      });

      it('drawer should have correct backdrop style when opened on another modal', async () => {
        const secondOverlay = await modalHelper.showModalWindow({
          title: 'Modal 2',
          component: undefined,
          flavor: 'drawer',
        });
        const secondIonModal = await ionModalController.getTop();
        expect(secondIonModal).toBeTruthy();
        const secondBackdrop = secondIonModal.querySelector('ion-backdrop');
        expect(secondBackdrop).toBeTruthy();
        expect(secondBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
        await secondOverlay.dismiss();
      });
    });
  });
});
