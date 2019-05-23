import { Component, ViewContainerRef } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { AlertConfig } from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'kirby-alert-example',
  templateUrl: './alert-example.component.html',
})
export class AlertExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Your alert',
      message: 'Your alert message',
      okBtnText: 'Ok',
      cancelBtnText: 'Cancel',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
