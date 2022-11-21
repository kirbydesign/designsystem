import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

export type ModalFlavor = 'modal' | 'compact';

export type ModalConfig = {
  flavor: ModalFlavor;
  component: any;
};

@Injectable()
export class ModalExperimentalController {
  constructor(private ionicModalController: ModalController) {}

  public async showModal(config: ModalConfig) {
    const modal = await this.ionicModalController.create({
      component: config.component,
    });
    modal.present();
  }
}
