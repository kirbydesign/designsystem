import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Injectable()
export class ModalService {
  constructor(private modalController: ModalController) {}

  public async showModal(config: ModalConfig, _vcRef: ViewContainerRef) {
    const uid = new Date().getTime();
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    await modal.present();
    return uid;
  }

  public registerModal(uid: number, closeModal: (callback: Function) => any) {
    // TODO: implement for ionic
  }

  public async hideModal(uid: number, callback: Function) {
    await this.modalController.dismiss();
    if (callback) {
      callback();
    }
  }
}
