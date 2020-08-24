import { Component } from '@angular/core';
import { IonFooter } from '@ionic/angular';
import { MockComponents } from 'ng-mocks';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { TestHelper } from '../../../testing/test-helper';
import { ModalFooterComponent } from '../footer/modal-footer.component';
import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { ThemeColorDirective } from '../../../directives';

const getColor = DesignTokenHelper.getColor;

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
    declarations: [MockComponents(IonFooter), ThemeColorDirective],
  });

  beforeEach(() => {});

  it('should create', () => {
    spectator = createHost(`<kirby-modal-footer></kirby-modal-footer>`);
    expect(spectator.component).toBeTruthy();
  });

  describe('Set bottom padding', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-modal-footer></kirby-modal-footer>`);
      modalFooterElement = spectator.element;
      ionFooterElement = spectator.query('ion-footer');
    });

    it('when --kirby-safe-area-bottom is set', () => {
      setSafeAreaBottom();
      const expected = BASE_PADDING_PX + SAFE_AREA_BOTTOM_PX + 'px';
      expectPaddingBottom().toEqual(expected);
    });

    it('when --kirby-safe-area-bottom is not set', () => {
      clearSafeAreaBottom();
      const expected = BASE_PADDING_PX + 'px';
      expectPaddingBottom().toEqual(expected);
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
        expectPaddingBottom().toEqual(PADDING_BOTTOM_PUSHED_BY_KEYBOARD);
      });

      it('should follow the keyboard down', () => {
        keyboardSlideOut();
        expectPaddingBottom().toEqual(PADDING_BOTTOM_NOT_PUSHED_BY_KEYBOARD);
      });
    });

    describe('when snapToKeyboard is false', () => {
      it('should not follow the keyboard up', () => {
        spectator.setHostInput('snapToKeyboard', false);
        keyboardSlideIn();
        expectPaddingBottom().toEqual(PADDING_BOTTOM_NOT_PUSHED_BY_KEYBOARD);
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

  // utility constants and functions

  const KEYBOARD_HEIGHT_PX = 216; // sample value, depends upon device
  const BASE_PADDING_PX = 16;
  const SAFE_AREA_BOTTOM_PX = 22;

  const PADDING_BOTTOM_NOT_PUSHED_BY_KEYBOARD = BASE_PADDING_PX + 'px';
  const PADDING_BOTTOM_PUSHED_BY_KEYBOARD = BASE_PADDING_PX + KEYBOARD_HEIGHT_PX + 'px';

  function setSafeAreaBottom() {
    modalFooterElement.style.setProperty('--kirby-safe-area-bottom', SAFE_AREA_BOTTOM_PX + 'px');
  }

  function clearSafeAreaBottom() {
    modalFooterElement.style.removeProperty('--kirby-safe-area-bottom');
  }

  function keyboardSlideIn() {
    modalFooterElement.style.setProperty('--keyboard-offset', KEYBOARD_HEIGHT_PX + 'px');
  }

  function keyboardSlideOut() {
    modalFooterElement.style.setProperty('--keyboard-offset', '0px');
  }

  function expectPaddingBottom() {
    return expect(TestHelper.getCssProperty(ionFooterElement, 'padding-bottom'));
  }
});
