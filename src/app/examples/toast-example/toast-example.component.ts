import { Component } from '@angular/core';

import { ToastConfig } from './../../../kirby/components/toast/config/toast-config';
import { ToastController } from '@kirbydesign/designsystem/components/toast/services/toast.controller';

@Component({
  selector: 'kirby-toast-example',
  templateUrl: './toast-example.component.html',
})
export class ToastExampleComponent {
  constructor(public toastController: ToastController) {}
  showToast() {
    const config: ToastConfig = {
      message: 'Your toast message',
      duration: 5000,
      themeColor: 'primary',
    };
    this.toastController.showToast(config, this.onToastClosed);
  }

  private onToastClosed() {
    console.log(`Toast closed`);
  }
}
