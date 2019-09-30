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
      title: 'Elektronisk post',
      message:
        'Vi anbefaler at du aktiverer elektronisk post, så du kan få det meste ud af dette samtykke. Vil du dette?',
      okBtn: { text: 'Ja tak' },
      cancelBtnText: 'Nej tak',
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  showAlertWithIcon() {
    const config: AlertConfig = {
      title: 'Elektronisk post',
      message:
        'Vi anbefaler at du aktiverer elektronisk post, så du kan få det meste ud af dette samtykke. Vil du dette?',
      okBtn: { text: 'Ja tak' },
      cancelBtnText: 'Nej tak',
      icon: { iconName: 'warning', themeColor: 'danger' },
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  showAlertWithoutCancel() {
    const config: AlertConfig = {
      title: 'Elektronisk post',
      message:
        'Vi anbefaler at du aktiverer elektronisk post, så du kan få det meste ud af dette samtykke. Vil du dette?',
      okBtn: { text: 'Ja tak' },
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  showDestructiveAlert() {
    const config: AlertConfig = {
      title: 'Elektronisk post',
      message:
        'Vi anbefaler at du aktiverer elektronisk post, så du kan få det meste ud af dette samtykke. Vil du dette?',
      cancelBtnText: 'Nej tak',
      okBtn: { text: 'Bekræft', isDestructive: true },
    };
    this.modalController.showAlert(config, this.onAlertClosed);
  }

  private onAlertClosed(selection?: boolean) {
    console.log(`Alert selection: ${selection}`);
  }
}
