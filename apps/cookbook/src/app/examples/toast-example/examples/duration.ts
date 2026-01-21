import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

const config = {
  selector: 'cookbook-toast-example-duration',
  template: `<button kirby-button (click)="showToast()">Show toast (2 seconds)</button>`,
};

const codeSnippet = `// Custom duration (2 seconds)
const config: ToastConfig = {
  message: 'This toast lasts 2 seconds',
  messageType: 'success',
  durationInMs: 2000,
};

this.toastController.showToast(config);`;

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['../../_examples.shared.scss', '../../_modal-playground.shared.scss'],
  imports: [ButtonComponent],
})
export class ToastExampleDurationComponent {
  static readonly template = config.template;
  static readonly codeSnippet = codeSnippet;

  constructor(private toastController: ToastController) {}

  showToast() {
    const config: ToastConfig = {
      message: 'This toast lasts 2 seconds',
      messageType: 'success',
      durationInMs: 2000,
    };
    this.toastController.showToast(config);
  }
}
