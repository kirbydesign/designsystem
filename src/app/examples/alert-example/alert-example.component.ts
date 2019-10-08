import { Component } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { AlertConfig } from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'kirby-alert-example',
  templateUrl: './alert-example.component.html',
})
export class AlertExampleComponent {
  constructor(private modalController: ModalController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      okBtn: 'I agree',
      cancelBtnText: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  showAlertWithIcon() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      okBtn: { text: 'I agree' },
      cancelBtnText: 'Take me back',
      icon: { iconName: 'warning', themeColor: 'warning' },
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  showAlertWithoutCancel() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      okBtn: { text: 'I agree' },
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  showDestructiveAlert() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      cancelBtnText: 'Get me out of here',
      okBtn: { text: 'Confirm', isDestructive: true },
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection?: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
