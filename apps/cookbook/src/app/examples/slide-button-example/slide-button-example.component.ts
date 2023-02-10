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

    const alert = this.alertController.showAlert(config);

    alert.onDidDismiss.subscribe((result) => {
      this.onAlertClosed(result.data);
    });
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
