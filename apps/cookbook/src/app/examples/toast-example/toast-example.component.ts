import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { MessageType, ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

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
  selector: 'cookbook-toast-example',
  templateUrl: './toast-example.component.html',
  styleUrls: ['../_examples.shared.scss', '../_modal-playground.shared.scss'],
  imports: [ButtonComponent],
})
export class ToastExampleComponent {
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
