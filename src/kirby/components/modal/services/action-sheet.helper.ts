import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';

import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';

@Injectable()
export class ActionSheetHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showActionSheet(
    config: ActionSheetConfig,
    vcRef: ViewContainerRef,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const modal = await this.ionicModalController.create({
      component: ActionSheetComponent,
      cssClass: 'kirby-action-sheet',
      componentProps: { config: config },
    });

    registerModal({ close: modal.dismiss.bind(modal) });

    modal.present();
    return modal.onDidDismiss();
  }
}
