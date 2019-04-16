import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { ModalConfig } from '../config/modal-config';
import { ModalComponent } from '../modal.component';
import { IModalController } from './modal.controller.interface';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModal(
    config: ModalConfig,
    _vcRef: ViewContainerRef,
    modalController: IModalController
  ): Promise<any> {
    const modal = await this.ionicModalController.create({
      component: ModalComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    modalController.registerModalCloseRef(modal.dismiss);

    modal.present();
    return modal.onDidDismiss();
  }
}
