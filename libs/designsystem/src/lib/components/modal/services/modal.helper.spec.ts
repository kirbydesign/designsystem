import { Component, Optional, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createService } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { WindowRef } from '../../../types/window-ref';
import { TestHelper } from '../../../testing/test-helper';
import { ModalHelper } from './modal.helper';
import { Overlay, Modal } from './modal.interfaces';

@Component({
  template: `
    <h2>Embedded Input</h2>
    <input #input />
  `,
})
class InputEmbeddedComponent implements OnInit {
  @ViewChild('input', { static: true, read: ElementRef })
  input: ElementRef;

  constructor(@Optional() private modal?: Modal) {}

  ngOnInit() {
    this.modal && this.modal.didPresent.then(() => this.input.nativeElement.focus());
  }
}

describe('ModalHelper', () => {
  let modalHelper: ModalHelper;
  let ionModalController: IonicModalController;
  let overlay: Overlay;
  let ionModal: HTMLIonModalElement;
  let ionBackdrop: HTMLIonBackdropElement;
  let ionModalWrapper: HTMLElement;
  let dummyPresentingElement: HTMLElement;

  const defaultBackdropOpacity = '0.4';
  const invisibleBackdropOpacity = '0.01';
  const defaultBorderRadius = DesignTokenHelper.borderRadius();
  const size = DesignTokenHelper.size;
  const backgroundColor = DesignTokenHelper.backgroundColor();

  const spectator = createService({
    service: ModalHelper,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
    providers: [
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
    entryComponents: [InputEmbeddedComponent],
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
    describe('on desktop', () => {
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
          await overlay.dismiss();
        });
      });

      describe(`with default flavor ('modal')`, () => {
        beforeEach(async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal',
            component: InputEmbeddedComponent,
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
        });

        it('modal wrapper should have correct style', () => {
          expect(ionModalWrapper).toHaveComputedStyle({
            'background-color': backgroundColor,
            'border-radius': defaultBorderRadius,
          });
        });

        it('modal window should not take focus from embedded input after opening', async () => {
          const ionContent = ionModal.querySelector<HTMLElement>('ion-content');
          await TestHelper.whenReady(ionContent);
          const input: HTMLInputElement = ionContent.querySelector<HTMLInputElement>('input');
          expect(input).toBeDefined();
          expect(document.activeElement).toEqual(input);
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
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
      });

      describe(`when modal is opened on top of another modal`, () => {
        type modalFlavorType = 'modal' | 'drawer' | 'compact';
        const modalFlavors: modalFlavorType[] = ['modal', 'drawer', 'compact'];
        modalFlavors.forEach((firstFlavor) => {
          describe(`when first modal has '${firstFlavor}' flavor`, () => {
            beforeEach(async () => {
              overlay = await modalHelper.showModalWindow({
                title: `First Modal - flavor: ${firstFlavor}`,
                component: undefined,
                flavor: firstFlavor,
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

            modalFlavors.forEach((secondFlavor) => {
              describe(`and second modal has '${secondFlavor}' flavor`, () => {
                it(`first modal should have no visible backdrop`, async () => {
                  const secondOverlay = await modalHelper.showModalWindow({
                    title: 'Modal 2',
                    component: undefined,
                    flavor: secondFlavor,
                  });
                  const secondIonModal = await ionModalController.getTop();
                  expect(secondIonModal).toBeTruthy();
                  expect(ionBackdrop).toHaveComputedStyle({ opacity: invisibleBackdropOpacity });
                  await secondOverlay.dismiss();
                });

                it(`second modal should have should have correct backdrop style`, async () => {
                  const secondOverlay = await modalHelper.showModalWindow({
                    title: `Second Modal - flavor: ${secondFlavor}`,
                    component: undefined,
                    flavor: secondFlavor,
                  });
                  const secondIonModal = await ionModalController.getTop();
                  expect(secondIonModal).toBeTruthy();
                  const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
                  expect(secondBackdrop).toBeTruthy();
                  expect(secondBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
                  await secondOverlay.dismiss();
                });
              });
            });
          });
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

      describe(`when opened on presenting element`, () => {
        beforeEach(() => {
          modalHelper.registerPresentingElement(dummyPresentingElement);
        });

        afterEach(() => {
          modalHelper.registerPresentingElement(undefined);
        });

        it(`modal should have no visible backdrop`, async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal On Presenting Element',
            component: undefined,
          });
          ionModal = await ionModalController.getTop();
          ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
          expect(ionBackdrop).toHaveComputedStyle({ opacity: invisibleBackdropOpacity });
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
          await overlay.dismiss();
        });

        describe('when iOS safe-area is present', () => {
          const safeAreaTop = '20px';
          beforeAll(() => {
            window.document.body.style.setProperty('--ion-safe-area-top', safeAreaTop);
          });

          afterAll(() => {
            window.document.body.style.removeProperty('--ion-safe-area-top');
          });

          it('modal toolbar should respect iOS safe-area', async () => {
            overlay = await modalHelper.showModalWindow({
              title: 'Modal On Presenting Element',
              component: undefined,
            });
            ionModal = await ionModalController.getTop();
            const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
            expect(ionToolbar).toHaveComputedStyle({ 'padding-top': safeAreaTop });
            await overlay.dismiss();
          });

          it('drawer should respect iOS safe-area', async () => {
            overlay = await modalHelper.showModalWindow({
              title: 'Modal On Presenting Element',
              component: undefined,
              flavor: 'drawer',
            });
            ionModal = await ionModalController.getTop();
            const expectedPaddingTop = `${parseInt(size('m')) + parseInt(safeAreaTop)}px`;
            expect(ionModal).toHaveComputedStyle({ 'padding-top': expectedPaddingTop });
            await overlay.dismiss();
          });

          it('drawer toolbar should not have additional padding', async () => {
            overlay = await modalHelper.showModalWindow({
              title: 'Modal On Presenting Element',
              component: undefined,
              flavor: 'drawer',
            });
            ionModal = await ionModalController.getTop();
            const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
            expect(ionToolbar).toHaveComputedStyle({ 'padding-top': '0px' });
            await overlay.dismiss();
          });
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
        });

        it('modal wrapper should have correct style', () => {
          expect(ionModalWrapper).toHaveComputedStyle({
            'background-color': backgroundColor,
            'border-radius': '0px',
          });
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
          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
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
      });

      describe('when iOS safe-area is present', () => {
        const safeAreaTop = '20px';
        beforeAll(() => {
          window.document.body.style.setProperty('--ion-safe-area-top', safeAreaTop);
        });

        afterAll(() => {
          window.document.body.style.removeProperty('--ion-safe-area-top');
        });

        it('modal toolbar should respect iOS safe-area', async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal On Presenting Element',
            component: undefined,
          });
          ionModal = await ionModalController.getTop();
          const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
          expect(ionToolbar).toHaveComputedStyle({ 'padding-top': safeAreaTop });
          await overlay.dismiss();
        });

        it('drawer should respect iOS safe-area', async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal On Presenting Element',
            component: undefined,
            flavor: 'drawer',
          });
          ionModal = await ionModalController.getTop();
          const expectedPaddingTop = `${parseInt(size('m')) + parseInt(safeAreaTop)}px`;
          expect(ionModal).toHaveComputedStyle({ 'padding-top': expectedPaddingTop });
          await overlay.dismiss();
        });

        it('drawer toolbar should not have additional padding', async () => {
          overlay = await modalHelper.showModalWindow({
            title: 'Modal On Presenting Element',
            component: undefined,
            flavor: 'drawer',
          });
          ionModal = await ionModalController.getTop();
          const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
          expect(ionToolbar).toHaveComputedStyle({ 'padding-top': '0px' });
          await overlay.dismiss();
        });
      });

      describe(`when modal is opened on top of another modal`, () => {
        type modalFlavorType = 'modal' | 'drawer' | 'compact';
        const modalFlavors: modalFlavorType[] = ['modal', 'drawer', 'compact'];
        modalFlavors.forEach((firstFlavor) => {
          describe(`when first modal has '${firstFlavor}' flavor`, () => {
            beforeEach(async () => {
              overlay = await modalHelper.showModalWindow({
                title: `First Modal - flavor: ${firstFlavor}`,
                component: undefined,
                flavor: firstFlavor,
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

            modalFlavors.forEach((secondFlavor) => {
              describe(`and second modal has '${secondFlavor}' flavor`, () => {
                if (firstFlavor === 'drawer') {
                  it(`first drawer should have no visible backdrop`, async () => {
                    const secondOverlay = await modalHelper.showModalWindow({
                      title: 'Modal 2',
                      component: undefined,
                      flavor: secondFlavor,
                    });
                    const secondIonModal = await ionModalController.getTop();
                    expect(secondIonModal).toBeTruthy();
                    expect(ionBackdrop).toHaveComputedStyle({ opacity: invisibleBackdropOpacity });
                    await secondOverlay.dismiss();
                  });
                }

                it(`second modal should have should have correct backdrop style`, async () => {
                  const secondOverlay = await modalHelper.showModalWindow({
                    title: `Second Modal - flavor: ${secondFlavor}`,
                    component: undefined,
                    flavor: secondFlavor,
                  });
                  const secondIonModal = await ionModalController.getTop();
                  expect(secondIonModal).toBeTruthy();
                  const secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
                  expect(secondBackdrop).toBeTruthy();
                  let expectedBackdropOpacity = defaultBackdropOpacity;
                  if (firstFlavor === 'modal' && secondFlavor === 'modal') {
                    expectedBackdropOpacity = invisibleBackdropOpacity;
                  }
                  expect(secondBackdrop).toHaveComputedStyle({ opacity: expectedBackdropOpacity });
                  await secondOverlay.dismiss();
                });
              });
            });
          });
        });
      });
    });
  });
});
