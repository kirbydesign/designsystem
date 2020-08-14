import { Component } from '@angular/core';
import { IonFooter } from '@ionic/angular';
import { MockComponents, MockComponent } from 'ng-mocks';
import {
  createComponentFactory,
  Spectator,
  SpectatorHost,
  createHostFactory,
} from '@ngneat/spectator';

import { TestHelper } from '../../../testing/test-helper';
import { ModalFooterComponent } from '../footer/modal-footer.component';
import { DesignTokenHelper } from '../../../helpers/design-token-helper';

const getColor = DesignTokenHelper.getColor;

@Component({
  template: '<kirby-modal-footer [snapToKeyboard]="snapToKeyboard"></kirby-modal-footer>',
})
class TestHostComponent {
  snapToKeyboard = false;
}
describe('ModalFooterComponent', () => {
  let spectator: Spectator<TestHostComponent>;
  let modalFooterElement: HTMLElement;
  let ionFooterElement: HTMLIonFooterElement;

  const createComponent = createComponentFactory({
    component: TestHostComponent,
    entryComponents: [],
    declarations: [TestHostComponent, ModalFooterComponent, MockComponents(IonFooter)],
  });

  beforeEach(() => {
    spectator = createComponent();
    modalFooterElement = spectator.element.querySelector('kirby-modal-footer');
    ionFooterElement = spectator.element.querySelector('ion-footer');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('Snap to keyboard', () => {
    describe('when snapToKeyboard is true', () => {
      beforeEach(() => spectator.setInput('snapToKeyboard', true));

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
      beforeEach(() => spectator.setInput('snapToKeyboard', false));

      it('should not follow the keyboard up', () => {
        keyboardSlideIn();
        expectPaddingBottom().toEqual(PADDING_BOTTOM_NOT_PUSHED_BY_KEYBOARD);
      });
    });
  });

  // TODO: BDYPLH - 20200814 I need help with these tests
  // describe('ModalFooterComponent background color', () => {
  //   fit('should be background-color when themeColor is light', () => {
  //     spectator.element.setAttribute('themeColor', 'light');
  //     const footer = spectator.element.querySelector('ion-footer');
  //     expect(footer).toHaveComputedStyle({
  //       'background-color': getColor('background-color'),
  //     });
  //   });

  //   fit('should be white when themeColor is white', () => {
  //     spectator.element.setAttribute('themeColor', 'white');
  //     const footer = spectator.element.querySelector('ion-footer');
  //     expect(footer).toHaveComputedStyle({
  //       'background-color': getColor('white'),
  //     });
  //   });

  //   fit('should be white when themeColor not set', () => {
  //     spectator.element.removeAttribute('themeColor');
  //     const footer = spectator.element.querySelector('ion-footer');
  //     expect(footer).toHaveComputedStyle({
  //       'background-color': getColor('white'),
  //     });
  //   });
  // });

  // utility constants and functions

  const KEYBOARD_HEIGHT_PX = 216; // sample value, depends upon device
  const BASE_PADDING_PX = 16;

  const PADDING_BOTTOM_NOT_PUSHED_BY_KEYBOARD = BASE_PADDING_PX + 'px';
  const PADDING_BOTTOM_PUSHED_BY_KEYBOARD = BASE_PADDING_PX + KEYBOARD_HEIGHT_PX + 'px';

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
