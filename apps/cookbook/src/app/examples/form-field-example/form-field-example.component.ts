import { Component, HostListener } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import { WindowRef } from '@kirbydesign/designsystem/types';

@Component({
  selector: 'cookbook-form-field-example',
  templateUrl: './form-field-example.component.html',
  styleUrls: ['./form-field-example.component.scss'],
})
export class FormFieldExampleComponent {
  size: InputSize;
  showDummyKeyboard: boolean;

  constructor(private windowRef: WindowRef) {
    this.showDummyKeyboard = !!this.windowRef.nativeWindow.sessionStorage.getItem(
      'kirby-cookbook-show-dummy-keyboard'
    );
  }

  toggleDummyKeyboard(show: boolean) {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard = show;
    this.showDummyKeyboard
      ? this.windowRef.nativeWindow.sessionStorage.setItem(sessionKey, 'true')
      : this.windowRef.nativeWindow.sessionStorage.removeItem(sessionKey);
    // Timeout prevents ExpressionChangedAfterItHasBeenCheckedError:
    setTimeout(() =>
      this.windowRef.nativeWindow.dispatchEvent(
        new CustomEvent('kirbyToggleDummyKeyboard', { detail: this.showDummyKeyboard })
      )
    );
  }

  @HostListener('window:kirbyToggleDummyKeyboard', ['$event.detail'])
  _onToggleDummyKeyboard(show: boolean) {
    this.showDummyKeyboard = show;
  }
}
