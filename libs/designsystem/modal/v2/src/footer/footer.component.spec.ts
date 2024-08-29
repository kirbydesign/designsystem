import { Component } from '@angular/core';
import { IonFooter } from '@ionic/angular/standalone';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/core';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { ModalV2FooterComponent } from './footer.component';

const size = DesignTokenHelper.size;

const KEYBOARD_HEIGHT = 216; // sample value, depends upon device
const BASE_PADDING_VERTICAL_PX = size('m');
const BASE_PADDING_VERTICAL = parseInt(BASE_PADDING_VERTICAL_PX);
const BASE_PADDING_HORIZONTAL_PX = size('m');
const SAFE_AREA_BOTTOM = 22;
const SAFE_AREA_BOTTOM_PX = `${SAFE_AREA_BOTTOM}px`;

const TRANSFORM_PUSHED_BY_KEYBOARD = `matrix(1, 0, 0, 1, 0, -${KEYBOARD_HEIGHT})`;

@Component({
  template: '<kirby-modal-v2-footer [snapToKeyboard]="snapToKeyboard"></kirby-modal-v2-footer>',
})
class TestHostComponent {
  snapToKeyboard = false;
}

describe('ModalFooterComponent', () => {
  let spectator: SpectatorHost<ModalV2FooterComponent, TestHostComponent>;
  let modalFooterElement: HTMLElement;
  let ionFooterElement: HTMLIonFooterElement;

  const createHost = createHostFactory({
    component: ModalV2FooterComponent,
    host: TestHostComponent,
    declarations: [MockComponents(IonFooter), ThemeColorDirective],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-modal-v2-footer></kirby-modal-v2-footer>`);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should set correct padding on the footer', () => {
      ionFooterElement = spectator.query('ion-footer');

      expect(ionFooterElement).toHaveComputedStyle({
        'padding-left': BASE_PADDING_HORIZONTAL_PX,
        'padding-right': BASE_PADDING_HORIZONTAL_PX,
        'padding-top': BASE_PADDING_VERTICAL_PX,
        'padding-bottom': BASE_PADDING_VERTICAL_PX,
      });
    });
  });

  describe('Set bottom padding', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-modal-v2-footer></kirby-modal-v2-footer>`);
      modalFooterElement = spectator.element;
      ionFooterElement = spectator.query('ion-footer');
    });

    describe('on desktop', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      it('when --kirby-safe-area-bottom is not set', () => {
        expect(ionFooterElement).toHaveComputedStyle({
          'padding-bottom': BASE_PADDING_VERTICAL_PX,
        });
      });

      it('when --kirby-safe-area-bottom is set', () => {
        setSafeAreaBottom();

        expect(ionFooterElement).toHaveComputedStyle({
          'padding-bottom': BASE_PADDING_VERTICAL_PX,
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

      it('when --kirby-safe-area-bottom is not set', () => {
        expect(ionFooterElement).toHaveComputedStyle({
          'padding-bottom': BASE_PADDING_VERTICAL_PX,
        });
      });

      it('when --kirby-safe-area-bottom is set', () => {
        setSafeAreaBottom();

        const expected = BASE_PADDING_VERTICAL + SAFE_AREA_BOTTOM + 'px';

        expect(ionFooterElement).toHaveComputedStyle({ 'padding-bottom': expected });
      });
    });
  });

  describe('Snap to keyboard', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-modal-v2-footer [snapToKeyboard]="snapToKeyboard"></kirby-modal-v2-footer>`
      );
      modalFooterElement = spectator.element;
      ionFooterElement = spectator.query('ion-footer');
    });

    describe('when snapToKeyboard is true', () => {
      beforeEach(() => {
        spectator.setHostInput('snapToKeyboard', true);
      });

      it('should follow the keyboard up', () => {
        keyboardSlideIn();

        expect(ionFooterElement).toHaveComputedStyle({
          transform: TRANSFORM_PUSHED_BY_KEYBOARD,
        });
      });

      it('should follow the keyboard down', () => {
        keyboardSlideOut();

        expect(ionFooterElement).toHaveComputedStyle({
          transform: 'none',
        });
      });
    });

    describe('when snapToKeyboard is false (default value)', () => {
      it('should not follow the keyboard up', () => {
        keyboardSlideIn();

        expect(ionFooterElement).toHaveComputedStyle({
          transform: 'none',
        });
      });
    });
  });

  describe('when inline type is set', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-modal-v2-footer type="inline"></kirby-modal-v2-footer>`);
    });

    it('should have a transparent background color', () => {
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': 'transparent',
      });
    });

    it('should not show a box shadow', () => {
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'box-shadow': 'none',
      });
    });
  });

  // utility functions
  function setSafeAreaBottom() {
    modalFooterElement.style.setProperty('--kirby-safe-area-bottom', SAFE_AREA_BOTTOM_PX);
  }

  function keyboardSlideIn() {
    modalFooterElement.style.setProperty('--keyboard-offset', KEYBOARD_HEIGHT + 'px');
    modalFooterElement.classList.add('keyboard-visible');
  }

  function keyboardSlideOut() {
    modalFooterElement.style.setProperty('--keyboard-offset', '0px');
    modalFooterElement.classList.remove('keyboard-visible');
  }
});
