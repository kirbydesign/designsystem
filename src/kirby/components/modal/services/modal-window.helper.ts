import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { ModalWindowConfig } from '../modal-window/config/modal-window-config';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Injectable()
export class ModalWindowHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModalWindow(
    config: ModalWindowConfig,
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
