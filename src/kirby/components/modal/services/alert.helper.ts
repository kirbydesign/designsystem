import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';

import { AlertConfig } from '../alert/config/alert-config';

@Injectable()
export class AlertHelper {
  constructor(private alertController: AlertController) {}

  public async showAlert(config: AlertConfig): Promise<boolean> {
    const result = new Promise<boolean>(async (resolve, _) => {
      let buttons = [];
      if (config.cancelBtnText) {
        buttons.push(this.getButton(config.cancelBtnText, true, resolve));
      }
      buttons.push(this.getButton(config.okBtnText, false, resolve));

      const alert = await this.alertController.create({
        header: config.title,
        message: config.message,
        mode: 'ios',
        buttons: buttons,
        backdropDismiss: false,
      });
      await alert.present();
    });
    return result;
  }

  private getButton(
    text: string,
    isCancelBtn: boolean,
    resolve: (value?: {} | PromiseLike<{}>) => void
  ): AlertButton {
    return {
      text: text,
      cssClass: ['kirby-alert-btn', isCancelBtn ? 'cancel' : ''],
      handler: () => {
        resolve(!isCancelBtn);
      },
    };
  }
}
