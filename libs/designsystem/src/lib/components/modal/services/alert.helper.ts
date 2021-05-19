import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AlertComponent } from '../alert/alert.component';
import { AlertConfig } from '../alert/config/alert-config';

import { Overlay } from './modal.interfaces';

@Injectable()
export class AlertHelper {
  constructor(private ionicModalController: ModalController) {}

  public async showAlert(config: AlertConfig): Promise<Overlay> {
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

  getOkBtnIsDestructive(config: any) {
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
