import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '~/kirby/components/modal/config/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';
import { ModalServiceInterface } from './modal-service-interface';

@Injectable()
export class ModalService implements ModalServiceInterface {
  constructor(private modalController: ModalController) {}

  public async showModal(
    config: ModalConfig,
    _vcRef: ViewContainerRef,
    callback?: Function
  ): Promise<void> {
    const uid = new Date().getTime();
    config.uid = uid;
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
