import { Component, OnInit } from '@angular/core';
import { ToastController, ToastConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirbydesign-transfer-and-pay-flow',
  templateUrl: './transfer-and-pay-flow.component.html',
})
export class TransferAndPayFlowComponent {
  constructor(private toastController: ToastController) {}

  showToast() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 5000,
    };
    this.toastController.showToast(config);
  }
}
