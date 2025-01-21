import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem';
import { SlideButtonComponent } from '@kirbydesign/designsystem/slide-button';

@Component({
  selector: 'cookbook-slide-button-example',
  templateUrl: './slide-button-example.component.html',
  imports: [SlideButtonComponent],
})
export class SlideButtonExampleComponent {
  constructor(private modalController: ModalController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Your alert',
      message: 'Your alert message',
      okBtn: 'Ok',
      cancelBtn: 'Cancel',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
