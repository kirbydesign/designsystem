import { Component } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { AlertConfig } from '@kirbydesign/designsystem/modal';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirby-alert-example',
  templateUrl: './alert-example.component.html',
})
export class AlertExampleComponent {
  constructor(private modalController: ModalController, private toastController: ToastController) {}

  showAlert() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  showAlertWithIcon() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
      icon: { name: 'warning', themeColor: 'warning' },
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  showAlertWithoutCancel() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      okBtn: 'I agree',
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  showDestructiveAlert() {
    const config: AlertConfig = {
      title: 'Your Alert',
      message: 'This is a slightly longer alert message text than what was previously here',
      cancelBtn: 'Get me out of here',
      okBtn: { text: 'Confirm', isDestructive: true },
    };
    this.modalController.showAlert(config, this.onAlertClosed.bind(this));
  }

  private onAlertClosed(result?: boolean) {
    const config: ToastConfig = {
      message: `Alert selection: ${result}`,
      messageType: result ? 'success' : 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
