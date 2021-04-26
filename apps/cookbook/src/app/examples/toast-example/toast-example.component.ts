import { Component } from '@angular/core';

import { ToastConfig } from '@kirbydesign/designsystem';
import { ToastController } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-toast-example',
  templateUrl: './toast-example.component.html',
})
export class ToastExampleComponent {
  constructor(public toastController: ToastController) {}
  showToast() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'danger',
      durationInMs: 5000,
    };
    this.toastController.showToast(config, this.onToastClosed);
  }

  private onToastClosed() {
    console.log(`Toast closed`);
  }
}
