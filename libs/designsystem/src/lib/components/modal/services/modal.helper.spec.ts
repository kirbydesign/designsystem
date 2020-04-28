import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createService } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { TestHelper } from '../../../testing/test-helper';
import { ModalHelper } from './modal.helper';
import { Overlay } from './modal.interfaces';

describe('ModalHelper', () => {
  let modalHelper: ModalHelper;
  let ionModalController: IonicModalController;
  let overlay: Overlay;
  let ionModal: HTMLIonModalElement;
  let ionBackdrop: HTMLIonBackdropElement;
  let ionModalWrapper: HTMLElement;
  let dummyPresentingElement: HTMLElement;

  const backdropOpacity = '0.4';
  const backdropDefaultOpacity = '0.01';
  const defaultBorderRadius = DesignTokenHelper.borderRadius();
  const size = DesignTokenHelper.size;
  const backgroundColor = DesignTokenHelper.backgroundColor();

  const spectator = createService({
    service: ModalHelper,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeAll(() => {
    dummyPresentingElement = window.document.createElement('div');
    dummyPresentingElement.innerHTML = '<h1>Dummy Presenting Element</h1>';
    dummyPresentingElement.style.position = 'absolute';
    dummyPresentingElement.style.top = '0px';
    dummyPresentingElement.style.right = '0px';
    dummyPresentingElement.style.bottom = '0px';
    dummyPresentingElement.style.left = '0px';
    dummyPresentingElement.style.backgroundColor = DesignTokenHelper.backgroundColor();
    window.document.body.append(dummyPresentingElement);
  });

  afterAll(() => {
    dummyPresentingElement.remove();
  });

  beforeEach(() => {
    modalHelper = spectator.service;
    ionModalController = spectator.inject(IonicModalController);
  });

  describe('showModalWindow', () => {
    describe(`when opened on presenting element`, () => {
      beforeEach(() => {
        modalHelper.registerPresentingElement(dummyPresentingElement);
      });

      afterEach(() => {
        modalHelper.registerPresentingElement(undefined);
      });

      it('modal should have correct backdrop style', async () => {
        overlay = await modalHelper.showModalWindow({
          title: 'Modal On Presenting Element',
          component: undefined,
        });
        ionModal = await ionModalController.getTop();
        ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
        expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
        await overlay.dismiss();
      });

      it('drawer should have correct backdrop style', async () => {
        overlay = await modalHelper.showModalWindow({
          title: 'Drawer On Presenting Element',
          component: undefined,
          flavor: 'drawer',
        });
        ionModal = await ionModalController.getTop();
        ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
        expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
        await overlay.dismiss();
      });
    });

    describe(`with default flavor ('modal')`, () => {
      beforeEach(async () => {
        overlay = await modalHelper.showModalWindow({ title: 'Modal', component: undefined });
        ionModal = await ionModalController.getTop();
        expect(ionModal).toBeTruthy();
        ionModalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
        expect(ionModalWrapper).toBeTruthy();
        ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
        expect(ionBackdrop).toBeTruthy();
      });

      afterEach(async () => {
        await overlay.dismiss();
      });

      it('modal should have correct backdrop style', () => {
        const modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
        expect(modalShadow).toHaveComputedStyle({ display: 'none' });
        expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
      });

      it('modal wrapper should have correct style', () => {
        expect(ionModalWrapper).toHaveComputedStyle({
          'background-color': backgroundColor,
          'border-radius': defaultBorderRadius,
        });
      });

      it('modal should have no visible backdrop when opened on another modal', async () => {
        const secondOverlay = await modalHelper.showModalWindow({
          title: 'Modal 2',
          component: undefined,
        });
        const secondIonModal = await ionModalController.getTop();
        expect(secondIonModal).toBeTruthy();
        const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
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
        const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
        expect(secondBackdrop).toBeTruthy();
        expect(secondBackdrop).toHaveComputedStyle({ opacity: '0' });
        await secondOverlay.dismiss();
      });
    });

    describe(`with 'drawer' flavor`, () => {
      beforeEach(async () => {
        overlay = await modalHelper.showModalWindow({
          title: 'Modal',
          component: undefined,
          flavor: 'drawer',
        });
        ionModal = await ionModalController.getTop();
        expect(ionModal).toBeTruthy();
        ionModalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
        expect(ionModalWrapper).toBeTruthy();
        ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
        expect(ionBackdrop).toBeTruthy();
      });

      afterEach(async () => {
        await overlay.dismiss();
      });

      it('modal should have correct backdrop style', () => {
        const modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
        expect(modalShadow).toHaveComputedStyle({ display: 'none' });
        expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
      });

      it('modal wrapper should have correct style', () => {
        expect(ionModalWrapper).toHaveComputedStyle({
          'background-color': backgroundColor,
          'border-radius': defaultBorderRadius,
        });
      });

      it('modal should have correct padding-top', () => {
        expect(ionModal).toHaveComputedStyle({ 'padding-top': '0px' });
      });

      it('drawer should have no visible backdrop when opened on another drawer', async () => {
        const secondOverlay = await modalHelper.showModalWindow({
          title: 'Modal 2',
          component: undefined,
          flavor: 'drawer',
        });
        const secondIonModal = await ionModalController.getTop();
        expect(secondIonModal).toBeTruthy();
        const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
        expect(secondBackdrop).toBeTruthy();
        expect(secondBackdrop).toHaveComputedStyle({ opacity: '0' });
        await secondOverlay.dismiss();
      });
    });

    describe(`with 'compact' flavor`, () => {
      beforeEach(async () => {
        overlay = await modalHelper.showModalWindow({
          title: 'Modal',
          component: undefined,
          flavor: 'compact',
        });
        ionModal = await ionModalController.getTop();
        expect(ionModal).toBeTruthy();
        ionModalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
        expect(ionModalWrapper).toBeTruthy();
        ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
        expect(ionBackdrop).toBeTruthy();
      });

      afterEach(async () => {
        await overlay.dismiss();
      });

      it('modal should have correct backdrop style', () => {
        const modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
        expect(modalShadow).toHaveComputedStyle({ display: 'none' });
        expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
      });

      it('modal wrapper should have correct style', () => {
        expect(ionModalWrapper).toHaveComputedStyle({
          'background-color': backgroundColor,
          'border-radius': defaultBorderRadius,
          'max-width': DesignTokenHelper.compactModalMaxWidth(),
          'text-align': 'center',
        });
        expect(ionModalWrapper.style.height).toEqual('');
      });

      it('modal should have correct padding-top', () => {
        expect(ionModal).toHaveComputedStyle({ 'padding-top': '0px' });
      });

      it('drawer should have no visible backdrop when opened on another drawer', async () => {
        const secondOverlay = await modalHelper.showModalWindow({
          title: 'Modal 2',
          component: undefined,
          flavor: 'drawer',
        });
        const secondIonModal = await ionModalController.getTop();
        expect(secondIonModal).toBeTruthy();
        const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
        expect(secondBackdrop).toBeTruthy();
        expect(secondBackdrop).toHaveComputedStyle({ opacity: '0' });
        await secondOverlay.dismiss();
      });
    });
  });

  describe('on small screens', () => {
    beforeAll(async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
    });

    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    describe('showModalWindow', () => {
      describe(`when opened on presenting element`, () => {
        beforeEach(() => {
          modalHelper.registerPresentingElement(dummyPresentingElement);
        });

        afterEach(() => {
          modalHelper.registerPresentingElement(undefined);
        });

        it('modal should have correct backdrop style', async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal On Presenting Element',
            component: undefined,
          });
          ionModal = await ionModalController.getTop();
          ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
          expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropDefaultOpacity });
          await overlay.dismiss();
        });

        it('drawer should have correct backdrop style', async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Drawer On Presenting Element',
            component: undefined,
            flavor: 'drawer',
          });
          ionModal = await ionModalController.getTop();
          ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
          expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
          await overlay.dismiss();
        });
      });

      describe(`with default flavor ('modal')`, () => {
        beforeEach(async () => {
          ionModalController = spectator.inject(IonicModalController);
          overlay = await modalHelper.showModalWindow({ title: 'Modal', component: undefined });
          ionModal = await ionModalController.getTop();
          expect(ionModal).toBeTruthy();
          ionModalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
          expect(ionModalWrapper).toBeTruthy();
          ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
          expect(ionBackdrop).toBeTruthy();
        });

        afterEach(async () => {
          await overlay.dismiss();
        });

        it('modal should have correct backdrop style', () => {
          const modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
          expect(modalShadow).toHaveComputedStyle({ display: 'none' });
          expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
        });

        it('modal wrapper should have correct style', () => {
          expect(ionModalWrapper).toHaveComputedStyle({
            'background-color': backgroundColor,
            'border-radius': '0px',
          });
        });

        describe(`when opened on another modal`, () => {
          let secondOverlay: Overlay;
          let secondIonModal: HTMLIonModalElement;
          let secondBackdrop: HTMLIonBackdropElement;

          beforeEach(async () => {
            secondOverlay = await modalHelper.showModalWindow({
              title: 'Modal 2',
              component: undefined,
            });
            secondIonModal = await ionModalController.getTop();
            expect(secondIonModal).toBeTruthy();
            secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
            expect(secondBackdrop).toBeTruthy();
          });

          afterEach(async () => {
            await secondOverlay.dismiss();
          });

          it('modal should have no visible backdrop when opened on another modal', () => {
            expect(secondBackdrop).toHaveComputedStyle({ opacity: backdropDefaultOpacity });
          });

          it('modal wrapper should have correct style', () => {
            expect(ionModalWrapper).toHaveComputedStyle({ 'border-radius': '0px' });
          });
        });

        it('drawer should have correct backdrop style when opened on another modal', async () => {
          const secondOverlay = await modalHelper.showModalWindow({
            title: 'Modal 2',
            component: undefined,
            flavor: 'drawer',
          });
          const secondIonModal = await ionModalController.getTop();
          expect(secondIonModal).toBeTruthy();
          const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
          expect(secondBackdrop).toBeTruthy();
          expect(secondBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
          await secondOverlay.dismiss();
        });
      });

      describe(`with 'drawer' flavor`, () => {
        beforeEach(async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal',
            component: undefined,
            flavor: 'drawer',
          });
          ionModal = await ionModalController.getTop();
          expect(ionModal).toBeTruthy();
          ionModalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
          expect(ionModalWrapper).toBeTruthy();
          ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
          expect(ionBackdrop).toBeTruthy();
        });

        afterEach(async () => {
          await overlay.dismiss();
        });

        it('drawer should have correct backdrop style', () => {
          expect(ionBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
        });

        it('drawer wrapper should have correct style', () => {
          expect(ionModalWrapper).toHaveComputedStyle({
            'background-color': backgroundColor,

            'border-top-left-radius': defaultBorderRadius,
            'border-top-right-radius': defaultBorderRadius,
            'border-bottom-left-radius': '0px',
            'border-bottom-right-radius': '0px',
          });
        });

        it('drawer should have correct padding-top', () => {
          expect(ionModal).toHaveComputedStyle({ 'padding-top': size('m') });
        });

        it('drawer should have correct backdrop style when opened on another drawer', async () => {
          const secondOverlay = await modalHelper.showModalWindow({
            title: 'Modal 2',
            component: undefined,
            flavor: 'drawer',
          });
          const secondIonModal = await ionModalController.getTop();
          expect(secondIonModal).toBeTruthy();
          const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
          expect(secondBackdrop).toBeTruthy();
          expect(secondBackdrop).toHaveComputedStyle({ opacity: backdropOpacity });
          await secondOverlay.dismiss();
        });
      });
    });
  });
});
