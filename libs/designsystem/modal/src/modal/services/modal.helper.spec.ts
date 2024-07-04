import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController as IonicModalController } from '@ionic/angular/standalone';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { WindowRef } from '@kirbydesign/designsystem/types';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { PageProgressComponent, PageTitleComponent } from '@kirbydesign/designsystem/page';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { Modal, Overlay } from '../../modal.interfaces';
import { ModalFooterComponent } from '../footer/modal-footer.component';
import {
  ModalCompactWrapperComponent,
  ModalConfig,
  ModalSize,
  ShowAlertCallback,
} from '../../modal-wrapper';
import { ModalNavigationService } from '../../modal-navigation.service';
import { ModalHelper } from './modal.helper';
import { CanDismissHelper } from './can-dismiss.helper';
import { AlertHelper } from './alert.helper';

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

@Component({
  template: `
    <kirby-page-progress>
      <div style="height: 50px; width: 50px; border: 1px solid red;"></div>
    </kirby-page-progress>
    <kirby-page-title>Modal With Page Progress</kirby-page-title>
  `,
})
class PageProgressEmbeddedComponent {}

function getElementVerticalCenter(element: Element): number {
  const elementDOMRect = element.getBoundingClientRect();
  return elementDOMRect.top + elementDOMRect.height / 2;
}

describe('ModalHelper', () => {
  let spectator: SpectatorService<ModalHelper>;
  let modalHelper: ModalHelper;
  let ionModalController: IonicModalController;
  let overlay: Overlay;
  let ionModal: HTMLIonModalElement;
  let dummyPresentingElement: HTMLElement;

  const size = DesignTokenHelper.size;

  const createService = createServiceFactory({
    service: ModalHelper,
    imports: [
      TestHelper.ionicModuleForTest,
      RouterTestingModule,
      ModalFooterComponent,
      ButtonComponent,
      ModalCompactWrapperComponent,
    ],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    declarations: [PageTitleComponent, PageProgressComponent, PageProgressEmbeddedComponent],
    entryComponents: [
      InputEmbeddedComponent,
      ContentOverflowsWithFooterEmbeddedComponent,
      ContentWithNoOverflowEmbeddedComponent,
    ],
    mocks: [ModalNavigationService, AlertHelper, CanDismissHelper],
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
    TestHelper.disableAnimationsInTest();
    spectator = createService();
    modalHelper = spectator.service;
    ionModalController = spectator.inject(IonicModalController);
  });

  afterEach(async () => {
    ionModal.canDismiss = true;
    await overlay.dismiss();
  });

  const openOverlay = async (config: ModalConfig) => {
    overlay = await modalHelper.showModalWindow(config);
    ionModal = await ionModalController.getTop();

    expect(ionModal).toBeTruthy();
  };

  const openModal = async (component?: any, size?: ModalSize, canDismiss?: ShowAlertCallback) => {
    await openOverlay({ flavor: 'modal', component, size, canDismiss });
  };

  const openDrawer = async (
    component?: any,
    size?: ModalSize,
    interactWithBackground?: boolean
  ) => {
    await openOverlay({ flavor: 'drawer', component, size, interactWithBackground });
  };

  describe('showModalWindow', () => {
    const allow_scroll_class = 'allow-background-scroll';

    it('modal window should not take focus from embedded input after opening', async () => {
      await openModal(InputEmbeddedComponent);
      const ionContent = ionModal.querySelector<HTMLElement>('ion-content');
      await TestHelper.whenReady(ionContent);

      const input: HTMLInputElement = ionContent.querySelector<HTMLInputElement>('input');
      expect(input).withContext('Input is not defined').toEqual(jasmine.anything());
      expect(document.activeElement).toEqual(input);
    });

    describe('canDismiss', () => {
      it('should pass "true" to "canDismiss", if no config.canDismiss callback is provided', async () => {
        await openModal();

        expect(ionModal.canDismiss).toEqual(true);
      });

      it('should call the getCanDismissCallback method, if a config.canDismiss callback is provided', async () => {
        const canDismissHelper = spectator.inject(CanDismissHelper);
        const showAlertCallback = () => true;

        await openModal(null, null, showAlertCallback);

        expect(canDismissHelper.getCanDismissCallback).toHaveBeenCalledTimes(1);
        expect(canDismissHelper.getCanDismissCallback).toHaveBeenCalledWith(showAlertCallback);
      });
    });

    describe(`when drawer can interact with background`, () => {
      beforeEach(async () => {
        await openDrawer(null, null, true);
      });

      it(`body should be scrollable`, async () => {
        expect(window.document.body.classList).toContain(allow_scroll_class);
        expect(window.document.body).toHaveComputedStyle({
          overflow: 'visible',
        });
      });

      it(`should remove '${allow_scroll_class}'`, async () => {
        await overlay.dismiss();
        expect(window.document.body.classList).not.toContain(allow_scroll_class);
      });
    });

    describe(`when drawer can not interact with background`, () => {
      it(`body should not be scrollable`, async () => {
        await openDrawer(null, null, false);

        expect(window.document.body.classList).not.toContain(allow_scroll_class);
      });
    });

    describe('size', () => {
      beforeEach(() => {
        TestHelper.scrollMainWindowToTop();
      });

      const expectSize = (size: ModalSize | undefined) => {
        expect(ionModal.classList.contains('kirby-modal-small')).toBe(size === 'small');
        expect(ionModal.classList.contains('kirby-modal-medium')).toBe(size === 'medium');
        expect(ionModal.classList.contains('kirby-modal-large')).toBe(size === 'large');
      };

      it('modal should have min-height', async () => {
        await openModal();

        const headerHeight = 88;
        const footerHeight = 88;
        const contentHeight = 88;

        const expectedHeight = headerHeight + footerHeight + contentHeight;

        expect(ionModal).toHaveComputedStyle({
          '--min-height': `${expectedHeight}px`,
        });
      });

      it('modal should be default sized (medium), if size is not provided', async () => {
        await openModal();

        expectSize('medium');
      });

      it('modal should be sized `small`', async () => {
        await openModal(undefined, 'small');

        expectSize('small');
      });

      it('modal should be sized `medium`', async () => {
        await openModal(undefined, 'medium');

        expectSize('medium');
      });

      it('modal should be sized `large`', async () => {
        await openModal(undefined, 'large');

        expectSize('large');
      });

      it('modal should be sized `full-height`', async () => {
        await openModal(undefined, 'full-height');

        expectSize('full-height');
        expect(ionModal).toHaveComputedStyle({ height: `${document.body.clientHeight}px` });
      });

      it('drawer should be sized `full-height`', async () => {
        await openDrawer(undefined, 'full-height');

        expectSize('full-height');
      });

      it('should not set default size class if configured with interactWithBackground', async () => {
        await openDrawer(undefined, undefined, true);

        expectSize(undefined);
      });

      /**
       * Temporaly removed, see #2736
       */
      xit('should NOT add class `full-height`, if content can fit in viewport', async () => {
        await openModal(ContentWithNoOverflowEmbeddedComponent);
        await TestHelper.waitForResizeObserver();

        expect(ionModal.classList.contains('full-height')).toBeFalse();
      });

      /**
       * Temporaly removed, see #2736
       */
      xit('should have footer visible at the bottom of viewport, when full-height', async () => {
        await openModal(ContentOverflowsWithFooterEmbeddedComponent);
        const footer = ionModal.querySelector('kirby-modal-footer');
        expect(footer).toBeTruthy();

        await TestHelper.waitForResizeObserver();

        expect(ionModal.classList.contains('full-height')).toBeTrue();
        expect(footer.getBoundingClientRect().bottom).toEqual(window.innerHeight);
      });
    });

    describe('padding top', () => {
      it('should have correct value for drawer flavor on desktop', async () => {
        await openDrawer();

        expect(ionModal).toHaveComputedStyle({
          'padding-top': '0px',
        });
      });

      it('should have correct value for modal flavor (default)', async () => {
        await openModal();

        expect(ionModal).toHaveComputedStyle({ 'padding-top': '0px' });
      });

      it('should have correct value for compact flavor', async () => {
        await openOverlay({
          flavor: 'compact',
          component: undefined,
        });

        expect(ionModal).toHaveComputedStyle({ 'padding-top': '0px' });
      });
    });

    describe('title', () => {
      let ionToolbarElement: HTMLIonToolbarElement;
      let pageTitleElement: HTMLDivElement;
      let pageTitleVerticalCenter: number;

      beforeEach(async () => {
        await openModal(PageProgressEmbeddedComponent);
        ionToolbarElement = ionModal.querySelector('ion-toolbar');
        pageTitleElement = ionToolbarElement.querySelector('kirby-page-title');
        pageTitleVerticalCenter = getElementVerticalCenter(pageTitleElement);
      });

      it('should align vertically with close button', () => {
        const closeButtonElement = ionToolbarElement.querySelector('[kirby-button]');
        const closeButtonVerticalCenter = getElementVerticalCenter(closeButtonElement);

        expect(closeButtonVerticalCenter).toEqual(pageTitleVerticalCenter);
      });

      it('should align vertically with page progress', () => {
        const pageProgressElement = ionToolbarElement.querySelector('kirby-page-progress');
        const pageProgressVerticalCenter = getElementVerticalCenter(pageProgressElement);

        expect(pageTitleVerticalCenter).toEqual(pageProgressVerticalCenter);
      });

      it('should have correct padding on tablet/desktop', () => {
        const toolbarContainer = ionToolbarElement.shadowRoot.querySelector('.toolbar-container');

        //subtract border thickness from expected bottom padding
        const expectedToolbarContainerPaddingBottom = parseInt(size('m')) - 1 + 'px';

        expect(toolbarContainer).toHaveComputedStyle({
          'padding-top': size('m'),
          'padding-right': size('m'),
          'padding-bottom': expectedToolbarContainerPaddingBottom,
          'padding-left': size('m'),
        });
        expect(ionToolbarElement).toHaveComputedStyle({
          'padding-top': '0px',
        });
      });

      it('should have correct padding on phone', async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
        const toolbarContainer = ionToolbarElement.shadowRoot.querySelector('.toolbar-container');

        //subtract border thickness from expected bottom padding
        const expectedToolbarContainerPaddingBottom = parseInt(size('xxs')) - 1 + 'px';

        expect(toolbarContainer).toHaveComputedStyle({
          'padding-top': size('xxs'),
          'padding-right': size('xxs'),
          'padding-bottom': expectedToolbarContainerPaddingBottom,
          'padding-left': size('xxs'),
        });
        expect(ionToolbarElement).toHaveComputedStyle({
          'padding-top': '0px',
        });

        TestHelper.resetTestWindow();
      });
    });
  });

  describe('on phone', () => {
    beforeAll(async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
    });

    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    describe('modal', () => {
      it('should be full height', async () => {
        await openModal(undefined, 'full-height');

        const viewportHeight = `${document.body.clientHeight}px`;
        const modalWrapper = ionModal.querySelector('kirby-modal-wrapper');

        expect(ionModal).toHaveComputedStyle({ height: `${document.body.clientHeight}px` });
        expect(modalWrapper).toHaveComputedStyle({
          height: viewportHeight,
        });
      });
    });

    describe('drawer', () => {
      it('should have correct value for padding top', async () => {
        await openDrawer();

        expect(ionModal).toHaveComputedStyle({
          'padding-top': size('m'),
        });
      });

      it('should add class `full-height`, if content can not fit in viewport', async () => {
        await openDrawer(ContentOverflowsWithFooterEmbeddedComponent);
        await TestHelper.waitForResizeObserver();

        expect(ionModal.classList.contains('full-height')).toBeTrue();
      });

      it('should have min-height', async () => {
        await openDrawer();

        expect(ionModal).toHaveComputedStyle({
          '--min-height': DesignTokenHelper.drawerDefaultHeight,
        });
      });

      describe('with size "full-height"', () => {
        it('should grow to fill screen minus padding top', async () => {
          const expectedPaddingTop = parseInt(size('m'));
          const expectedHeight = `${document.body.clientHeight - expectedPaddingTop}px`;
          await openDrawer(ContentOverflowsWithFooterEmbeddedComponent);
          await TestHelper.waitForResizeObserver();

          expect(ionModal.querySelector('kirby-modal-wrapper')).toHaveComputedStyle({
            height: expectedHeight,
          });
        });
      });
    });

    describe('when iOS safe-area is present', () => {
      const safeAreaTop = '20px';

      beforeAll(() => {
        window.document.documentElement.style.setProperty('--ion-safe-area-top', safeAreaTop);
      });

      afterAll(async () => {
        window.document.documentElement.style.removeProperty('--ion-safe-area-top');
      });

      it('modal toolbar should respect iOS safe-area', async () => {
        await openModal();
        const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');

        expect(ionToolbar).toHaveComputedStyle({ 'padding-top': safeAreaTop });
      });

      it('drawer should respect iOS safe-area', async () => {
        await openDrawer();
        const expectedPaddingTop = `${parseInt(size('m')) + parseInt(safeAreaTop)}px`;

        expect(ionModal).toHaveComputedStyle({ 'padding-top': expectedPaddingTop });
      });

      it('drawer toolbar should not have additional padding', async () => {
        await openDrawer();
        const ionToolbar = ionModal.querySelector('ion-header > ion-toolbar');

        expect(ionToolbar).toHaveComputedStyle({ 'padding-top': '0px' });
      });
    });
  });
});
