import { Component } from '@angular/core';

import { MessageType, ToastConfig } from '@kirbydesign/designsystem';
import { ToastController } from '@kirbydesign/designsystem';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-toast-example',
  templateUrl: './toast-example.component.html',
  imports: [ButtonComponent],
})
export class ToastExampleComponent {
  constructor(public toastController: ToastController) {}
  showToast(messageType?: MessageType) {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType,
      durationInMs: 5000,
    };
    this.toastController.showToast(config, this.onToastClosed);
  }

  private onToastClosed() {
    console.log(`Toast closed`);
  }
}
