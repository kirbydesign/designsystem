import { Injectable } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { AlertConfig } from '../alert/config/alert-config';
import { AlertComponent } from '../alert/alert.component';
import { IModal } from './modal.model';

@Injectable()
export class AlertHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showAlert(config: AlertConfig): Promise<IModal> {
    const ionModal = await this.ionicModalController.create({
      component: AlertComponent,
      componentProps: this.getComponentProps(config),
      cssClass: 'kirby-alert',
      mode: 'ios',
      backdropDismiss: false,
    });

    await ionModal.present();
    return { close: ionModal.dismiss.bind(ionModal), onClose: ionModal.onDidDismiss() };
  }

  private getComponentProps(config: AlertConfig) {
    return {
      ...config,
      okBtnText: this.getOkBtnText(config),
      cancelBtnText: this.getCancelBtnText(config),
      okBtnIsDestructive: this.getOkBtnIsDestructive(config),
      iconName: config.icon && config.icon.name,
      iconThemeColor: config.icon && config.icon.themeColor,
    };
  }

  private getOkBtnText(config: AlertConfig) {
    let text: string;
    if (config.okBtnText) {
      console.warn(
        '`okBtnText` will be deprecated on next major version. Please use `okBtn` instead.'
      );
      text = config.okBtnText;
    }
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

  private getCancelBtnText(config: AlertConfig) {
    if (config.cancelBtnText) {
      console.warn(
        '`cancelBtnText` will be deprecated on next major version. Please use `cancelBtn` instead.'
      );
    }
    return config.cancelBtn || config.cancelBtnText;
  }
}
