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

  public async closeModal(data?: any) {
    // Should we let the developers provide the role as an argument?
    return this.ionModal.dismiss(data, 'cancel');
  }
}
