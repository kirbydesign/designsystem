import { Component, OnInit } from '@angular/core';
import { ToastController, ToastConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirbydesign-transfer-and-pay-flow',
  templateUrl: './transfer-and-pay-flow.component.html',
})
export class TransferAndPayFlowComponent implements OnInit {
  constructor(private toastController: ToastController) {}

  onTabSelect(): void {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 10000,
    };
    this.toastController.showToast(config);
  }

  ngOnInit(): void {}
}
