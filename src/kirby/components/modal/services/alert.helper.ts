import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController as IonicModalController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';

import { AlertConfig } from '../alert/config/alert-config';
import { AlertComponent } from '../../alert/alert.component';

@Injectable()
export class AlertHelper {
  constructor(
    private alertController: AlertController,
    private ionicModalController: IonicModalController
  ) {}

  public async showAlert(
    config: AlertConfig,
    registerModal: (modal: { close: (selection: boolean) => {} }) => void
  ): Promise<any> {
    const alert = await this.ionicModalController.create({
      component: AlertComponent,
      componentProps: { config: config },
      cssClass: 'kirby-alert',
      mode: 'ios',
      backdropDismiss: false,
    });

    registerModal({ close: alert.dismiss.bind(alert) });

    await alert.present();
    return alert.onDidDismiss();
  }
}
