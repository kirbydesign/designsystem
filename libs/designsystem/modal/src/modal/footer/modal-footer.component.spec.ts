import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ModalFooterComponent } from '../footer/modal-footer.component';

const { getColor, size } = DesignTokenHelper;

const KEYBOARD_HEIGHT = 216; // sample value, depends upon device
const BASE_PADDING_PX = size('m');
const BASE_PADDING_SMALL_SCREEN = 12;
const BASE_PADDING_SMALL_SCREEN_PX = `${BASE_PADDING_SMALL_SCREEN}px`;
const SAFE_AREA_BOTTOM = 22;
const SAFE_AREA_BOTTOM_PX = `${SAFE_AREA_BOTTOM}px`;

const TRANSFORM_PUSHED_BY_KEYBOARD = `matrix(1, 0, 0, 1, 0, -${KEYBOARD_HEIGHT})`;

@Component({
  template: '<kirby-modal-footer [snapToKeyboard]="snapToKeyboard"></kirby-modal-footer>',
})
class TestHostComponent {
  snapToKeyboard = false;
}

describe('ModalFooterComponent', () => {
  let spectator: SpectatorHost<ModalFooterComponent, TestHostComponent>;
  let modalFooterElement: HTMLElement;
  let ionFooterElement: HTMLIonFooterElement;

  const createHost = createHostFactory({
    component: ModalFooterComponent,
    host: TestHostComponent,
  });

  beforeEach(() => {});

  it('should create', () => {
    spectator = createHost(`<kirby-modal-footer></kirby-modal-footer>`);
    expect(spectator.component).toBeTruthy();
  });

  it('should set correct padding', () => {
    spectator = createHost(`<kirby-modal-footer></kirby-modal-footer>`);
    expect(spectator.component).toBeTruthy();
    ionFooterElement = spectator.query('ion-footer');
    expect(ionFooterElement).toHaveComputedStyle({
      'padding-left': BASE_PADDING_PX,
      'padding-right': BASE_PADDING_PX,
      'padding-top': BASE_PADDING_PX,
      'padding-bottom': BASE_PADDING_PX,
    });
  });

  describe('Set bottom padding', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-modal-footer></kirby-modal-footer>`);
      modalFooterElement = spectator.element;
      ionFooterElement = spectator.query('ion-footer');
    });

    it('when --kirby-safe-area-bottom is not set', () => {
      expect(ionFooterElement).toHaveComputedStyle({ 'padding-bottom': size('m') });
    });

    /**
     * Temporaly removed, see #2736
     */
    xit('when --kirby-safe-area-bottom is set', () => {
      setSafeAreaBottom();
      expect(ionFooterElement).toHaveComputedStyle({ 'padding-bottom': size('m') });
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
          'padding-bottom': BASE_PADDING_SMALL_SCREEN_PX,
        });
      });

      it('when --kirby-safe-area-bottom is set', () => {
        setSafeAreaBottom();
        const expected = BASE_PADDING_SMALL_SCREEN + SAFE_AREA_BOTTOM + 'px';
        expect(ionFooterElement).toHaveComputedStyle({ 'padding-bottom': expected });
      });
    });
  });

  describe('Snap to keyboard', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-modal-footer [snapToKeyboard]="snapToKeyboard"></kirby-modal-footer>`
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

    describe('when snapToKeyboard is false', () => {
      it('should not follow the keyboard up', () => {
        spectator.setHostInput('snapToKeyboard', false);
        keyboardSlideIn();
        expect(ionFooterElement).toHaveComputedStyle({
          transform: 'none',
        });
      });
    });
  });

  describe('ModalFooterComponent background color', () => {
    it('should be background-color when themeColor is light', () => {
      spectator = createHost(`<kirby-modal-footer themeColor="light"></kirby-modal-footer>`);
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': getColor('background-color'),
      });
    });

    it('should be white when themeColor is white', () => {
      spectator = createHost(`<kirby-modal-footer themeColor="white"></kirby-modal-footer>`);
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    it('should be white when themeColor not set', () => {
      spectator = createHost(`<kirby-modal-footer></kirby-modal-footer>`);
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    it('should be white when color set by themeColor is not supported', () => {
      spectator = createHost(`<kirby-modal-footer themeColor="primary"></kirby-modal-footer>`);
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });
  });

  describe('when inline type is set', () => {
    it('should have a transparent background color', () => {
      spectator = createHost(`<kirby-modal-footer type="inline"></kirby-modal-footer>`);
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': 'transparent',
      });
    });

    it('should have a transparent background even when themeColor is specified', () => {
      spectator = createHost(
        `<kirby-modal-footer type="inline" themeColor="primary"></kirby-modal-footer>`
      );
      expect(spectator.query('ion-footer')).toHaveComputedStyle({
        'background-color': 'transparent',
      });
    });

    it('should not show a box shadow', () => {
      spectator = createHost(`<kirby-modal-footer type="inline"></kirby-modal-footer>`);
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
