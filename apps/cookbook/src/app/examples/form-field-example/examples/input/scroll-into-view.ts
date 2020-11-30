import { Component, HostListener } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types';

const config = {
  selector: 'cookbook-form-field-scroll-into-view-example',
  template: `<label>Scroll-into-view wrapper</label>
<div scroll-into-view>
  <kirby-form-field>
    <input kirby-input placeholder="Focus me on device to scroll wrapper into view" />
  </kirby-form-field>
  <button kirby-button attentionLevel="2">OK</button>
</div>
<fieldset>
  <legend>Configuration</legend>
  <label (click)="showDummyKeyboard = !showDummyKeyboard">
    <kirby-checkbox
      [checked]="showDummyKeyboard"
      (checkedChange)="toggleDummyKeyboard()"
    ></kirby-checkbox
    >Show dummy keyboard</label
  >
</fieldset>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./scroll-into-view.scss'],
})
export class FormFieldScrollIntoViewExampleComponent {
  constructor(private window: WindowRef) {}

  template: string = config.template.split('<fieldset>')[0]; // Remove config part of the template
  showDummyKeyboard = !!this.window.sessionStorage.getItem('kirby-cookbook-show-dummy-keyboard');

  toggleDummyKeyboard() {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard
      ? this.window.sessionStorage.removeItem(sessionKey)
      : this.window.sessionStorage.setItem(sessionKey, 'true');
    // Timeout prevents ExpressionChangedAfterItHasBeenCheckedError:
    setTimeout(() =>
      this.window.dispatchEvent(
        new CustomEvent('kirbyToggleDummyKeyboard', { detail: this.showDummyKeyboard })
      )
    );
  }

  @HostListener('window:kirbyToggleDummyKeyboard', ['$event.detail'])
  _onToggleDummyKeyboard(show: boolean) {
    if (this.showDummyKeyboard !== undefined) {
      this.showDummyKeyboard = show;
    }
  }
}
