import { Component } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

const config = {
  selector: 'cookbook-checkbox-events-example',
  template: `<kirby-checkbox
  (checkedChange)="onCheckedChange($event)"
  text="Toggle to see 'checkedChange' event in action">
</kirby-checkbox>`,
  codeSnippet: `onCheckedChange(checked: boolean) {
  ...
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [CheckboxComponent],
})
export class CheckboxEventsExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  constructor(private toastController: ToastController) {}

  onCheckedChange(checked: boolean) {
    const config: ToastConfig = {
      message: `Checkbox changed - checked: ${checked}`,
      messageType: checked ? 'success' : 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
