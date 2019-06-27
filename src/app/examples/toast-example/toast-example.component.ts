import { Component } from '@angular/core';

import { ToastConfig } from './../../../kirby/components/toast/config/toast-config';
import { ToastController } from './../../../kirby/components/toast/services/toast.controller';

@Component({
  selector: 'kirby-toast-example',
  templateUrl: './toast-example.component.html',
})
export class ToastExampleComponent {
  constructor(public toastController: ToastController) {}
  showToast() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 5000,
    };
    this.toastController.showToast(config, this.onToastClosed);
  }

  private onToastClosed() {
    console.log(`Toast closed`);
  }
}
