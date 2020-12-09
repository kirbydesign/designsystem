import { Component, HostListener } from '@angular/core';

import { DesignTokenHelper } from '@kirbydesign/designsystem';

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

  constructor(private window: WindowRef) {
    this.setKeyboardSize();
  }

  get keys() {
    return Array(this.keyCount).fill('');
  }

  private setKeyboardSize() {
    const keyboardHeights = {
      tablet: {
        portrait: 408,
        landscape: 434,
      },
      phone: {
        portrait: 290,
        landscape: 200,
      },
    };
    const query = `(min-width: ${DesignTokenHelper.breakpoints.medium})`;
    const device = this.window.matchMedia(query).matches ? 'tablet' : 'phone';
    const orientation = this.window.matchMedia('(orientation: landscape)').matches
      ? 'landscape'
      : 'portrait';
    this.keyboardHeight = keyboardHeights[device][orientation];
    const keysPerRow = device === 'phone' ? 7 : 10;
    const rows = 4;
    this.keyCount = keysPerRow * rows;
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

  @HostListener('window:kirbyToggleDummyKeyboard', ['$event.detail'])
  _onToggleDummyKeyboard(show: boolean) {
    this.showDummyKeyboard = show;
  }

  @HostListener('document:focusin', ['$event.target'])
  _onInputFocus(input: HTMLElement) {
    if (!this.showDummyKeyboard) return;
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      const ionKeyboardDidShowEvent = new CustomEvent('ionKeyboardDidShow', {
        detail: { keyboardHeight: this.keyboardHeight },
      });
      const keyboardDidShowDelayInMs = 100;
      setTimeout(
        () => this.window.dispatchEvent(ionKeyboardDidShowEvent),
        keyboardDidShowDelayInMs
      );
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
