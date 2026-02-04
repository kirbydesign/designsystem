import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

const config = {
  selector: 'cookbook-toast-example-default',
  template: `<button kirby-button (click)="showSuccessToast()">Show success toast</button>
<button kirby-button (click)="showWarningToast()">Show warning toast</button>`,
};

const codeSnippet = `const config: ToastConfig = {
  message: 'Your toast message',
  messageType: 'success',
};
this.toastController.showToast(config);`;

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['../../_examples.shared.scss', '../../_modal-playground.shared.scss'],
  imports: [ButtonComponent],
})
export class ToastExampleDefaultComponent {
  static readonly template = config.template;
  static readonly codeSnippet = codeSnippet;

  constructor(private toastController: ToastController) {}

  showSuccessToast() {
    const config: ToastConfig = {
      message: 'Your successful toast message',
      messageType: 'success',
    };
    this.toastController.showToast(config);
  }

  showWarningToast() {
    const config: ToastConfig = {
      message: 'Your warning toast message',
      messageType: 'warning',
    };
    this.toastController.showToast(config);
  }
}
