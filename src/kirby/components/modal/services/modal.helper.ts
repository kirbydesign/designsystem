import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { ModalConfig } from '../config/modal-config';
import { ModalComponent } from '../modal.component';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModal(
    config: ModalConfig,
    _vcRef: ViewContainerRef,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const modal = await this.ionicModalController.create({
      component: ModalComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    registerModal({ close: modal.dismiss });

    modal.present();
    return modal.onDidDismiss();
  }
}
