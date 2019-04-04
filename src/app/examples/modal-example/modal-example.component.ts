import { Component } from '@angular/core';

import { PayAndTransferModalContentExampleComponent } from './pay-and-transfer-modal-content-example/pay-and-transfer-modal-content-example.component';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '~/kirby/components/modal/modal.component';
import { ModalConfig } from '~/kirby/components/modal/modal-config';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  constructor(public modalController: ModalController) {}

  async openModal() {
    const config: ModalConfig = {
      title: 'Betal & Overfør',
      titleHorizontalAlignment: 'center',
      component: PayAndTransferModalContentExampleComponent,
    };

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
}
