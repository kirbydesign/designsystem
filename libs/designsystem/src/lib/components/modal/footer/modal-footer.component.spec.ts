import { Component } from '@angular/core';
import { IonFooter } from '@ionic/angular';
import { MockComponents } from 'ng-mocks';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '../../../testing/test-helper';
import { ModalFooterComponent } from '../footer/modal-footer.component';

@Component({
  template: '<kirby-modal-footer [snapToKeyboard]="snapToKeyboard"></kirby-modal-footer>',
})
class TestHostComponent {
  snapToKeyboard = false;
}

describe('ModalWrapperComponent', () => {
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
