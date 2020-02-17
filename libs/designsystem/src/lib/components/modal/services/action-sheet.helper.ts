import { Injectable, EventEmitter } from '@angular/core';
import { ModalController as IonicModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';
import { ActionSheetItem } from '../action-sheet/config/action-sheet-item';

@Injectable()
export class ActionSheetHelper {
  constructor(private ionicModalController: IonicModalController) {}

  public async showActionSheet(
    config: ActionSheetConfig,
    registerModal: (modal: { close: (data?: any) => {} }) => void
  ): Promise<any> {
    const cancel = new EventEmitter();
    const itemSelect = new EventEmitter<ActionSheetItem>();

    const modal = await this.ionicModalController.create({
      component: ActionSheetComponent,
      cssClass: 'kirby-action-sheet',
      componentProps: {
        ...config,
        cancel: cancel,
        itemSelect: itemSelect,
      },
    });

    const cancelSubscription: Subscription = cancel.subscribe(() => modal.dismiss());
    const itemSelectSubscription: Subscription = itemSelect.subscribe((item) =>
      modal.dismiss(item)
    );
    const onDidDismiss = modal.onDidDismiss();
    onDidDismiss.then((_) => {
      cancelSubscription.unsubscribe();
      itemSelectSubscription.unsubscribe();
    });

    registerModal({ close: modal.dismiss.bind(modal) });

    modal.present();
    return onDidDismiss;
  }
}
