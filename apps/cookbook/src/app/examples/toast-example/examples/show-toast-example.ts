import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { MessageType, ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

const config = {
  selector: 'cookbook-show-toast-example',
  template: `
  <button kirby-button (click)="showToast()">Show success toast (default)</button>
  <button kirby-button (click)="showToast('warning')">Show warning toast</button>
  `,
};

const ts = `showToast(messageType?: MessageType) {
  const message =
    messageType === 'warning' ? 'Your warning toast message' : 'Your successful toast message';
  
  const config: ToastConfig = {
    message,
    messageType,
    durationInMs: 5000,
  };
  this.toastController.showToast(config, this.onToastClosed);
}

private onToastClosed() {
  console.log(\`Toast closed\`);
}`;

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./show-toast-example.scss'],
  imports: [ButtonComponent],
})
export class ShowToastExampleComponent {
  template = config.template;
  static readonly ts = ts;

  constructor(public toastController: ToastController) {}

  showToast(messageType?: MessageType) {
    const message =
      messageType === 'warning' ? 'Your warning toast message' : 'Your successful toast message';

    const config: ToastConfig = {
      message,
      messageType,
      durationInMs: 5000,
    };
    this.toastController.showToast(config, this.onToastClosed);
  }

  private onToastClosed() {
    console.log(`Toast closed`);
  }
}
