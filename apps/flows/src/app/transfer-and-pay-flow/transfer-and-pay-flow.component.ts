import { Component } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirbydesign-transfer-and-pay-flow',
  templateUrl: './transfer-and-pay-flow.component.html',
})
export class TransferAndPayFlowComponent {
  constructor(private toastController: ToastController) {}

  showToastMessage() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 5000,
    };
    this.toastController.showToast(config);
  }
}
