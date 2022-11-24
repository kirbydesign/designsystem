import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

export type ModalFlavor = 'modal' | 'compact';

export type ModalConfig = {
  flavor?: ModalFlavor;
  component: any;
  componentProps?: { [key: string]: any };
};

@Injectable()
export class ModalExperimentalController {
  constructor(private ionicModalController: ModalController) {}
  ionModal: HTMLIonModalElement;

  public async showModal(config: ModalConfig): Promise<HTMLIonModalElement> {
    this.ionModal = await this.ionicModalController.create({
      component: config.component,
      componentProps: config.componentProps,
    });

    await this.ionModal.present();

    return this.ionModal;
  }

  public async closeModal(role: string, data?: any) {
    return this.ionModal.dismiss(data, role);
  }
}
