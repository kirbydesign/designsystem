import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AlertComponent } from '../alert.component';
import { AlertConfig } from '../config/alert-config';

@Injectable()
export class AlertController {
  constructor(private ionicModalController: ModalController) {}

  public async showAlert(config: AlertConfig) {
    const ionModal = await this.ionicModalController.create({
      component: AlertComponent,
      componentProps: this.getComponentProps(config),
      cssClass: ['kirby-overlay', 'kirby-alert'],
      mode: 'ios',
      backdropDismiss: false,
    });

    await ionModal.present();
    return {
      dismiss: ionModal.dismiss.bind(ionModal),
      onWillDismiss: ionModal.onWillDismiss(),
      onDidDismiss: ionModal.onDidDismiss(),
    };
  }

  private getComponentProps(config: AlertConfig) {
    return {
      ...config,
      okBtn: this.getOkBtn(config),
      cancelBtn: config.cancelBtn,
      okBtnIsDestructive: this.getOkBtnIsDestructive(config),
      iconName: config.icon && config.icon.name,
      iconThemeColor: config.icon && config.icon.themeColor,
    };
  }

  private getOkBtn(config: AlertConfig) {
    let text: string;

    if (config.okBtn) {
      if (typeof config.okBtn === 'string') {
        text = config.okBtn;
      } else {
        text = config.okBtn.text;
      }
    }
    return text;
  }

  getOkBtnIsDestructive(config) {
    return typeof config.okBtn === 'object' ? config.okBtn.isDestructive : undefined;
  }
}
