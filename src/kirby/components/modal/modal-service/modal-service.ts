import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Injectable()
export class ModalService {
  constructor(private modalController: ModalController) {}

  public async showModal(config: ModalConfig, _vcRef: ViewContainerRef) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    await modal.present();
  }

  public async hideModal(callback: Function) {
    await this.modalController.dismiss();
    if (callback) {
      callback();
    }
  }
}
