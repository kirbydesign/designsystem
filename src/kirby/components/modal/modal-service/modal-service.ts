import { Injectable, ViewContainerRef } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';

import { ModalConfig } from '~/kirby/components/modal/modal-config';
import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Injectable()
export class ModalService {
  constructor(public modalController: ModalController) {}

  public async showModal(config: ModalConfig, _vcRef: ViewContainerRef) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('res:', detail.data);
      }
    });

    await modal.present();
  }

  public async hideModal(message: string) {
    await this.modalController.dismiss(message);
  }
}
