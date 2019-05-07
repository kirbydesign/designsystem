import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { ModalConfig } from '../config/modal-config';
import { ModalWindowComponent } from '../modal-window.component';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModal(
    config: ModalConfig,
    _vcRef: ViewContainerRef,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const modal = await this.ionicModalController.create({
      component: ModalWindowComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    registerModal({ close: modal.dismiss });

    modal.present();
    return modal.onDidDismiss();
  }
}
