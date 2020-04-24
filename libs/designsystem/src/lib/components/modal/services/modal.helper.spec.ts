import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createService } from '@ngneat/spectator';

import { ModalHelper } from './modal.helper';
import { Overlay } from './modal.interfaces';

describe('ModalHelper', () => {
  let modalHelper: ModalHelper;
  const backdropOpacity = '0.4';
  const ionicTransparentBackdropOpacity = '0.01';
  const smallScreenWidth = '375px';
  const smallScreenHeight = '667px';

  const spectator = createService({
    service: ModalHelper,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeEach(() => {
    modalHelper = spectator.service;
  });

  describe('showModal', () => {
    let overlay: Overlay;
    let ionModal: HTMLIonModalElement;
    let backdrop: HTMLIonBackdropElement;
    let ionModalController: IonicModalController;
    const backdropOpacity = '0.4';

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
    describe('showModal', () => {
      let overlay: Overlay;
      let ionModal: HTMLIonModalElement;
      let backdrop: HTMLIonBackdropElement;
      let ionModalController: IonicModalController;

      beforeAll((done) => {
        if (window.frameElement) {
          console.log(
            `Set test window width and height to: ${smallScreenWidth} x ${smallScreenHeight}`
          );
          (window.frameElement as HTMLIFrameElement).style.width = smallScreenWidth;
          (window.frameElement as HTMLIFrameElement).style.height = smallScreenHeight;
          // Ensure window has resized before executing:
          setTimeout(done, 10);
        }
      });

      afterAll(() => {
        if (window.frameElement) {
          console.log('Resetting test window width');
          (window.frameElement as HTMLIFrameElement).style.width = null;
          (window.frameElement as HTMLIFrameElement).style.height = null;
        }
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
