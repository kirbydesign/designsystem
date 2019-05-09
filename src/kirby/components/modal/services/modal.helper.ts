import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { ModalWrapperConfig } from '../modal-wrapper/config/modal-wrapper-config';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

@Injectable()
export class ModalHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showModalWindow(
    config: ModalWrapperConfig,
    _vcRef: ViewContainerRef,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const modal = await this.ionicModalController.create({
      component: ModalWrapperComponent,
      cssClass: 'kirby-modal',
      componentProps: { config: config },
    });

    registerModal({ close: modal.dismiss });

    modal.present();
    return modal.onDidDismiss();
  }
}
