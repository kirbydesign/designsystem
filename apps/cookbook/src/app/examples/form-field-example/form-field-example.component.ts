import { Component, HostListener } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types';

@Component({
  selector: 'cookbook-form-field-example',
  templateUrl: './form-field-example.component.html',
  styleUrls: ['./form-field-example.component.scss'],
})
export class FormFieldExampleComponent {
  constructor(private window: WindowRef) {}
  size: string = 'lg';
  onSizeChange(size: string) {
    this.size = size;
  }
  showDummyKeyboard = !!this.window.sessionStorage.getItem('kirby-cookbook-show-dummy-keyboard');

  toggleDummyKeyboard(show: boolean) {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard = show;
    this.showDummyKeyboard
      ? this.window.sessionStorage.setItem(sessionKey, 'true')
      : this.window.sessionStorage.removeItem(sessionKey);
    // Timeout prevents ExpressionChangedAfterItHasBeenCheckedError:
    setTimeout(() =>
      this.window.dispatchEvent(
        new CustomEvent('kirbyToggleDummyKeyboard', { detail: this.showDummyKeyboard })
      )
    );
  }

  @HostListener('window:kirbyToggleDummyKeyboard', ['$event.detail'])
  _onToggleDummyKeyboard(show: boolean) {
    this.showDummyKeyboard = show;
  }
}
