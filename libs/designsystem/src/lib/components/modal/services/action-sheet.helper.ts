import { EventEmitter, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ActionSheetPopoutComponent } from '../action-sheet-popout/action-sheet-popout.component';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetItem } from '../action-sheet/config/action-sheet-item';

import { Overlay } from './modal.interfaces';

@Injectable()
export class ActionSheetHelper {
  constructor(private ionicModalController: ModalController) {}

  public async showActionSheet(config: ActionSheetConfig): Promise<Overlay> {
    const cancel = new EventEmitter();
    const itemSelect = new EventEmitter<ActionSheetItem>();

    const ionModal = await this.ionicModalController.create({
      component: ActionSheetPopoutComponent,
      cssClass: ['kirby-overlay', 'kirby-action-sheet-popout'],
      componentProps: {
        ...config,
        cancel: cancel,
        itemSelect: itemSelect,
      },
      backdropDismiss: false,
    });

    const cancelSubscription: Subscription = cancel.subscribe(() => ionModal.dismiss());
    const itemSelectSubscription: Subscription = itemSelect.subscribe((item) =>
      ionModal.dismiss(item)
    );
    const onDidDismiss = ionModal.onDidDismiss();
    onDidDismiss.then((_) => {
      cancelSubscription.unsubscribe();
      itemSelectSubscription.unsubscribe();
    });

    await ionModal.present();
    return {
      dismiss: ionModal.dismiss.bind(ionModal),
      onWillDismiss: ionModal.onWillDismiss(),
      onDidDismiss: ionModal.onDidDismiss(),
    };
  }
}
