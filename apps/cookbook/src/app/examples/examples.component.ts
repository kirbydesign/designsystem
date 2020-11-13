import { Component, HostListener } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types/window-ref';

@Component({
  selector: 'cookbook-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent {
  showDummyKeyboard = !!this.window.sessionStorage.getItem('kirby-cookbook-show-dummy-keyboard');
  keyboardIsShowing = false;
  keyboardHeight: number;
  keyCount = 40;
  keys = Array(this.keyCount).fill('');

  constructor(private window: WindowRef) {
    this.setKeyboardSize();
  }

  private setKeyboardSize() {
    const keyboardHeights = {
      tablet: {
        portrait: 264,
        landscape: 434,
      },
      phone: {
        portrait: 290,
        landscape: 200,
      },
    };
    const device = this.window.matchMedia('(min-width: 721px)').matches ? 'tablet' : 'phone';
    const orientation = this.window.matchMedia('(orientation: landscape)').matches
      ? 'landscape'
      : 'portrait';
    this.keyboardHeight = keyboardHeights[device][orientation];
  }

  @HostListener('window:ionKeyboardDidShow', ['$event'])
  _onKeyboardDidShow(event: { detail: { keyboardHeight: number } }) {
    this.keyboardHeight = event.detail.keyboardHeight;
    this.keyboardIsShowing = true;
  }

  @HostListener('window:ionKeyboardDidHide')
  _onKeyboardDidHide() {
    this.keyboardIsShowing = false;
  }

  @HostListener('window:kirbyToggleDummyKeyboard')
  _onToggleDummyKeyboard() {
    setTimeout(() => {
      this.showDummyKeyboard = !this.showDummyKeyboard;
      const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
      this.showDummyKeyboard
        ? this.window.sessionStorage.setItem(sessionKey, 'true')
        : this.window.sessionStorage.removeItem(sessionKey);
    });
  }

  @HostListener('document:focusin', ['$event.target'])
  _onInputFocus(input: HTMLElement) {
    if (!this.showDummyKeyboard) return;
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      const ionKeyboardDidShowEvent = new CustomEvent('ionKeyboardDidShow', {
        detail: { keyboardHeight: this.keyboardHeight },
      });
      this.window.dispatchEvent(ionKeyboardDidShowEvent);
    }
  }

  @HostListener('document:focusout', ['$event.target'])
  _onInputFocusOut(input: HTMLElement) {
    if (!this.showDummyKeyboard) return;
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      const ionKeyboardDidHideEvent = new CustomEvent('ionKeyboardDidHide');
      this.window.dispatchEvent(ionKeyboardDidHideEvent);
    }
  }

  @HostListener('window:resize')
  _onWindowResize() {
    if (!this.showDummyKeyboard) return;
    this.setKeyboardSize();
  }
}
