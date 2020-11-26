import { Component, Optional, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, ModalController as IonicModalController } from '@ionic/angular';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { WindowRef } from '../../../types/window-ref';
import { ScreenSize, TestHelper } from '../../../testing/test-helper';
import { IconComponent } from '../../icon';
import { ModalFooterComponent } from '../footer/modal-footer.component';
import { ModalConfig } from '../modal-wrapper/config/modal-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { ModalCompactWrapperComponent } from '../modal-wrapper/compact/modal-compact-wrapper.component';
import { ModalHelper } from './modal.helper';
import { Overlay, Modal } from './modal.interfaces';
import { ModalNavigationService } from './modal-navigation.service';

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

@Component({
  template: `
    <div [style.height.px]="height">Content</div>
    <kirby-modal-footer>
      <button kirby-button>Button inside footer</button>
    </kirby-modal-footer>
  `,
})
class ContentOverflowsWithFooterEmbeddedComponent {
  height: number = window.innerHeight;
}

@Component({
  template: `
    <div style="height: 1px;">Content</div>
  `,
})
class ContentWithNoOverflowEmbeddedComponent {}

describe('ModalHelper', () => {
  let spectator: SpectatorService<ModalHelper>;
  let modalHelper: ModalHelper;
  let ionModalController: IonicModalController;
  let overlay: Overlay;
  let ionModal: HTMLIonModalElement;
  let ionBackdrop: HTMLIonBackdropElement;
  let modalShadow: HTMLElement;
  let ionModalWrapper: HTMLElement;
  let dummyPresentingElement: HTMLElement;

  const defaultBackdropOpacity = '0.4';
  const invisibleBackdropOpacity = '0.01';
  const defaultBorderRadius = DesignTokenHelper.borderRadius();
  const size = DesignTokenHelper.size;
  const backgroundColor = DesignTokenHelper.backgroundColor();

  const createService = createServiceFactory({
    service: ModalHelper,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true }), RouterTestingModule],
    providers: [
      {
        provide: WindowRef,
        useValue: window,
      },
    ],
    declarations: [
      ModalFooterComponent,
      ModalWrapperComponent,
      ModalCompactWrapperComponent,
      MockComponent(IconComponent),
    ],
    entryComponents: [
      InputEmbeddedComponent,
      ContentOverflowsWithFooterEmbeddedComponent,
      ContentWithNoOverflowEmbeddedComponent,
    ],
    mocks: [ModalNavigationService],
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
    spectator = createService();
    modalHelper = spectator.service;
    ionModalController = spectator.inject(IonicModalController);
  });

  const openOverlay = async (config: ModalConfig) => {
    overlay = await modalHelper.showModalWindow(config);
    ionModal = await ionModalController.getTop();
    expect(ionModal).toBeTruthy();
    ionModalWrapper = ionModal.querySelector(':scope > .modal-wrapper');
    expect(ionModalWrapper).toBeTruthy();
    ionBackdrop = ionModal.querySelector(':scope > ion-backdrop');
    expect(ionBackdrop).toBeTruthy();
    modalShadow = ionModal.querySelector<HTMLElement>(':scope > .modal-shadow');
    expect(modalShadow).toBeTruthy();
  };

  const openModal = async (
    title: string = 'Modal',
    component?: any,
    size?: 'small' | 'medium' | 'large'
  ) => {
    await openOverlay({ flavor: 'modal', title, component, size });
  };

  const openDrawer = async (title: string = 'Drawer', component?: any) => {
    await openOverlay({ flavor: 'drawer', title, component });
  };

  const expectShadowStyle = () => {
    it('should not show shadow', () => {
      expect(modalShadow).toHaveComputedStyle({ display: 'none' });
    });
  };

  const expectBackdropStyle = () => {
    it('should have correct backdrop style', () => {
      expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
    });
  };

  const expectModalWrapperStyle = (screenSize?: ScreenSize) => {
    it('wrapper should have correct style', () => {
      const expectedRadius = screenSize === 'phone' ? '0px' : defaultBorderRadius;
      expect(ionModalWrapper).toHaveComputedStyle({
        'background-color': backgroundColor,
        'border-radius': expectedRadius,
      });
    });
  };

  const expectDrawerWrapperStyle = () => {
    it('wrapper should have correct style', () => {
      expect(ionModalWrapper).toHaveComputedStyle({
        'background-color': backgroundColor,
        'border-radius': `${defaultBorderRadius} ${defaultBorderRadius} 0px 0px`,
      });
    });
  };

  describe('showModalWindow', () => {
    const screenSizes: ScreenSize[] = ['phablet-landscape', 'tablet', 'desktop'];
    screenSizes.forEach((screenSize) => {
      describe(`on ${screenSize}`, () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize[screenSize]);
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

          describe(`modal`, () => {
            beforeEach(async () => {
              await openModal('Modal On Presenting Element');
            });

            afterEach(async () => {
              await overlay.dismiss();
            });

            expectShadowStyle();
            expectBackdropStyle();
            expectModalWrapperStyle();
          });

          describe(`drawer`, () => {
            beforeEach(async () => {
              await openDrawer('Drawer On Presenting Element');
            });

            afterEach(async () => {
              await overlay.dismiss();
            });

            expectShadowStyle();
            expectBackdropStyle();
            expectDrawerWrapperStyle();
          });
        });

        describe('sizing', () => {
          beforeEach(() => {
            TestHelper.scrollMainWindowToTop();
          });

          afterEach(async () => {
            await overlay.dismiss();
          });

          const expectSize = (size: 'small' | 'medium' | 'large' | undefined) => {
            expect(ionModal.classList.contains('small')).toBe(size === 'small');
            expect(ionModal.classList.contains('medium')).toBe(size === 'medium');
            expect(ionModal.classList.contains('large')).toBe(size === 'large');
          };

          it('modal should have min-height', async () => {
            await openModal();

            expect(ionModalWrapper).toHaveComputedStyle({
              '--min-height': DesignTokenHelper.modalDefaultHeight,
            });
          });

          it('drawer should have min-height', async () => {
            await openDrawer();

            expect(ionModalWrapper).toHaveComputedStyle({
              '--min-height': DesignTokenHelper.drawerDefaultHeight,
            });
          });

          it('modal should be default sized (medium), if size is not provided', async () => {
            await openModal();

            expectSize('medium');
          });

          it('modal should be sized `small`', async () => {
            await openModal('Small Modal', undefined, 'small');

            expectSize('small');
          });

          it('modal should be sized `medium`', async () => {
            await openModal('Medium Modal', undefined, 'medium');

            expectSize('medium');
          });

          it('modal should be sized `large`', async () => {
            await openModal('Large Modal', undefined, 'large');

            expectSize('large');
          });

          it('should not set sizing class if flavor is `drawer`', async () => {
            await openDrawer();

            expectSize(undefined);
          });

          it("should add class `full-height`, if content can't fit in viewport", async () => {
            await openDrawer('Modal with full height', ContentOverflowsWithFooterEmbeddedComponent);
            await TestHelper.waitForResizeObserver();

            expect(ionModalWrapper.classList.contains('full-height')).toBeTrue();
          });

          it('should NOT add class `full-height`, if content can fit in viewport', async () => {
            await openModal('Modal with minimum height', ContentWithNoOverflowEmbeddedComponent);
            await TestHelper.waitForResizeObserver();

            expect(ionModalWrapper.classList.contains('full-height')).toBeFalse();
          });

          it('should have footer visible at the bottom of viewport, when full-height', async () => {
            await openModal(
              'Modal with full height and footer',
              ContentOverflowsWithFooterEmbeddedComponent
            );
            const footer = ionModal.querySelector('kirby-modal-footer');
            expect(footer).toBeTruthy();
            await TestHelper.waitForResizeObserver();

            expect(ionModalWrapper.classList.contains('full-height')).toBeTrue();
            expect(footer.getBoundingClientRect().bottom).toEqual(window.innerHeight);
          });
        });

        describe(`with default flavor ('modal')`, () => {
          beforeEach(async () => {
            await openModal('Modal', InputEmbeddedComponent);
          });

          afterEach(async () => {
            await overlay.dismiss();
          });

          expectShadowStyle();
          expectBackdropStyle();
          expectModalWrapperStyle();

          it('modal should have correct padding-top', () => {
            expect(ionModal).toHaveComputedStyle({ 'padding-top': size('xl') });
          });

          it('modal window should not take focus from embedded input after opening', async () => {
            const ionContent = ionModal.querySelector<HTMLElement>('ion-content');
            await TestHelper.whenReady(ionContent);

            const input: HTMLInputElement = ionContent.querySelector<HTMLInputElement>('input');
            expect(input)
              .withContext('Input is not defined')
              .toEqual(jasmine.anything());
            expect(document.activeElement).toEqual(input);
          });
        });

        describe(`with 'drawer' flavor`, () => {
          beforeEach(async () => {
            await openDrawer();
          });

          afterEach(async () => {
            await overlay.dismiss();
          });

          expectShadowStyle();
          expectBackdropStyle();
          expectDrawerWrapperStyle();

          it('modal should have correct padding-top', () => {
            const headerHeight = 46;
            expect(ionModal).toHaveComputedStyle({
              'padding-top': `${parseInt(size('xl')) + headerHeight / 2}px`,
            });
          });
        });

        describe(`with 'compact' flavor`, () => {
          beforeEach(async () => {
            await openOverlay({
              flavor: 'compact',
              title: 'Compact Modal',
              component: undefined,
            });
          });

          afterEach(async () => {
            await overlay.dismiss();
          });

          expectShadowStyle();
          expectBackdropStyle();

          it('wrapper should have correct style', () => {
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
                await openOverlay({
                  flavor: firstFlavor,
                  title: `First Modal - flavor: ${firstFlavor}`,
                  component: undefined,
                });
              });

              afterEach(async () => {
                await overlay.dismiss();
              });

              modalFlavors.forEach((secondFlavor) => {
                describe(`and second modal has '${secondFlavor}' flavor`, () => {
                  let secondOverlay: Overlay;
                  let secondBackdrop: HTMLIonBackdropElement;
                  beforeEach(async () => {
                    secondOverlay = await modalHelper.showModalWindow({
                      flavor: secondFlavor,
                      title: `Second Modal - flavor: ${secondFlavor}`,
                      component: undefined,
                    });
                    const secondIonModal = await ionModalController.getTop();
                    expect(secondIonModal).toBeTruthy();
                    secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
                    expect(secondBackdrop).toBeTruthy();
                  });

                  afterEach(async () => {
                    await secondOverlay.dismiss();
                  });

                  it(`first modal should have no visible backdrop`, () => {
                    expect(ionBackdrop).toHaveComputedStyle({ opacity: invisibleBackdropOpacity });
                  });

                  it(`second modal should have should have correct backdrop style`, () => {
                    expect(secondBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
                  });
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
          await openModal('Modal On Presenting Element');

          expect(ionBackdrop).toHaveComputedStyle({ opacity: invisibleBackdropOpacity });
          await overlay.dismiss();
        });

        it('drawer should have correct backdrop style', async () => {
          await openDrawer('Drawer On Presenting Element');

          expect(ionBackdrop).toHaveComputedStyle({ opacity: defaultBackdropOpacity });
          await overlay.dismiss();
        });

        describe('when iOS safe-area is present', () => {
          const safeAreaTop = '20px';

          beforeAll(() => {
            window.document.documentElement.style.setProperty('--ion-safe-area-top', safeAreaTop);
          });

          afterAll(() => {
            window.document.documentElement.style.removeProperty('--ion-safe-area-top');
          });

          it('modal toolbar should respect iOS safe-area', async () => {
            await openModal('Modal On Presenting Element');

            const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
            expect(ionToolbar).toHaveComputedStyle({ 'padding-top': safeAreaTop });
            await overlay.dismiss();
          });

          it('drawer should respect iOS safe-area', async () => {
            await openDrawer('Drawer On Presenting Element');

            const expectedPaddingTop = `${parseInt(size('m')) + parseInt(safeAreaTop)}px`;
            expect(ionModal).toHaveComputedStyle({ 'padding-top': expectedPaddingTop });
            await overlay.dismiss();
          });

          it('drawer toolbar should not have additional padding', async () => {
            await openDrawer('Drawer On Presenting Element');

            const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
            expect(ionToolbar).toHaveComputedStyle({ 'padding-top': '0px' });
            await overlay.dismiss();
          });
        });
      });

      describe(`with default flavor ('modal')`, () => {
        beforeEach(async () => {
          await openModal();
        });

        afterEach(async () => {
          await overlay.dismiss();
        });

        expectShadowStyle();
        expectBackdropStyle();
        expectModalWrapperStyle('phone');
      });

      describe(`with 'drawer' flavor`, () => {
        beforeEach(async () => {
          await openDrawer();
        });

        afterEach(async () => {
          await overlay.dismiss();
        });

        expectShadowStyle();
        expectBackdropStyle();
        expectDrawerWrapperStyle();

        it('drawer should have correct padding-top', () => {
          expect(ionModal).toHaveComputedStyle({ 'padding-top': size('m') });
        });
      });

      describe('when iOS safe-area is present', () => {
        const safeAreaTop = '20px';
        beforeAll(() => {
          window.document.documentElement.style.setProperty('--ion-safe-area-top', safeAreaTop);
        });

        afterAll(() => {
          window.document.documentElement.style.removeProperty('--ion-safe-area-top');
        });

        it('modal toolbar should respect iOS safe-area', async () => {
          await openModal();

          const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');
          expect(ionToolbar).toHaveComputedStyle({ 'padding-top': safeAreaTop });
          await overlay.dismiss();
        });

        it('drawer should respect iOS safe-area', async () => {
          await openDrawer();

          const expectedPaddingTop = `${parseInt(size('m')) + parseInt(safeAreaTop)}px`;
          expect(ionModal).toHaveComputedStyle({ 'padding-top': expectedPaddingTop });
          await overlay.dismiss();
        });

        it('drawer toolbar should not have additional padding', async () => {
          await openDrawer();

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
              await openOverlay({
                flavor: firstFlavor,
                title: `First Modal - flavor: ${firstFlavor}`,
                component: undefined,
              });
            });

            afterEach(async () => {
              await overlay.dismiss();
            });

            modalFlavors.forEach((secondFlavor) => {
              describe(`and second modal has '${secondFlavor}' flavor`, () => {
                let secondOverlay: Overlay;
                let secondBackdrop: HTMLIonBackdropElement;
                beforeEach(async () => {
                  secondOverlay = await modalHelper.showModalWindow({
                    flavor: secondFlavor,
                    title: `Second Modal - flavor: ${secondFlavor}`,
                    component: undefined,
                  });
                  const secondIonModal = await ionModalController.getTop();
                  expect(secondIonModal).toBeTruthy();
                  secondBackdrop = secondIonModal.querySelector(':scope > ion-backdrop');
                  expect(secondBackdrop).toBeTruthy();
                });

                afterEach(async () => {
                  await secondOverlay.dismiss();
                });

                if (firstFlavor === 'drawer') {
                  it(`first drawer should have no visible backdrop`, () => {
                    expect(ionBackdrop).toHaveComputedStyle({ opacity: invisibleBackdropOpacity });
                  });
                }

                it(`second modal should have should have correct backdrop style`, () => {
                  let expectedBackdropOpacity = defaultBackdropOpacity;
                  if (firstFlavor === 'modal' && secondFlavor === 'modal') {
                    expectedBackdropOpacity = invisibleBackdropOpacity;
                  }
                  expect(secondBackdrop).toHaveComputedStyle({ opacity: expectedBackdropOpacity });
                });
              });
            });
          });
        });
      });
    });
  });
});
