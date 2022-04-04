import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-slide-button-example',
  templateUrl: './slide-button-example.component.html',
  styleUrls: ['./slide-button-example.component.scss'],
})
export class SlideButtonExampleComponent {
  constructor(private modalController: ModalController) {}

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
