import { Component, OnInit } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirbydesign-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  constructor(private toastController: ToastController) {}

  ngOnInit(): void {}

  onCardSelect() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 10000,
    };
    this.toastController.showToast(config);
  }
}
