import { Component } from '@angular/core';

import { AlertConfig, AlertController } from '@kirbydesign/designsystem/alert';

@Component({
  selector: 'cookbook-slide-button-example',
  templateUrl: './slide-button-example.component.html',
})
export class SlideButtonExampleComponent {
  constructor(private alertController: AlertController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Your alert',
      message: 'Your alert message',
      okBtn: 'Ok',
      cancelBtn: 'Cancel',
    };
    // this.modalController.showAlert(config, this.onAlertClosed); Need to do subscription logic here
    this.alertController.showAlert(config);
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
