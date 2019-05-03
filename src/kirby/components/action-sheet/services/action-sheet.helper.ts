import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ActionSheetConfig } from '../config/action-sheet-config';
import { ActionSheetComponent } from '../action-sheet.component';

@Injectable()
export class ActionSheetHelper {
  constructor(private modalController: ModalController) {}

  public async showActionSheet(config: ActionSheetConfig, vcRef: ViewContainerRef): Promise<any> {
    const modal = await this.modalController.create({
      component: ActionSheetComponent,
      cssClass: 'kirby-action-sheet',
      componentProps: { config: config },
    });

    modal.present();
    return modal.onDidDismiss();
  }
}
