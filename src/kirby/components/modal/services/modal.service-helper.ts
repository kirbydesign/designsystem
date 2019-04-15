import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '../config/modal-config';
import { ModalComponent } from '../modal.component';

@Injectable()
export class ModalServiceHelper {
  constructor(private modalController: ModalController) {}

  public async showModal(
    config: ModalConfig,
    _vcRef: ViewContainerRef,
    callback?: Function
  ): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    modal.onDidDismiss().then((data) => {
      if (callback) {
        callback(data['data']);
      }
    });

    modal.present();
  }

  public async hideModal(_: number, data?: any): Promise<void> {
    await this.modalController.dismiss(data);
  }
}
