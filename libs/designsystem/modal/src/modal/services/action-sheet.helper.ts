import { EventEmitter, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Overlay } from '../../modal.interfaces';

import { ActionSheetComponent } from '../action-sheet/action-sheet.component';
import { ActionSheetConfig } from '../action-sheet/config/action-sheet-config';
import { ActionSheetItem } from '../action-sheet/config/action-sheet-item';

@Injectable()
export class ActionSheetHelper {
  constructor(private ionicModalController: ModalController) {}

  public async showActionSheet(config: ActionSheetConfig): Promise<Overlay> {
    const cancel = new EventEmitter();
    const itemSelect = new EventEmitter<ActionSheetItem>();

    const ionModal = await this.ionicModalController.create({
      component: ActionSheetComponent,
      cssClass: ['kirby-overlay', 'kirby-action-sheet'],
      componentProps: {
        ...config,
        cancel: cancel,
        itemSelect: itemSelect,
      },
      backdropDismiss: true,
    });

    // Remove 'modal-shadow' element as we are no longer able to hide it with CSS in Ionic 6.
    // We need to remove it so it does not obstruct the backdrop-click to dismiss functionality.
    ionModal.shadowRoot.querySelector('.modal-shadow').remove();

    const cancelSubscription: Subscription = cancel.subscribe(() => ionModal.dismiss());
    const itemSelectSubscription: Subscription = itemSelect.subscribe((item) =>
      ionModal.dismiss(item)
    );
    const onDidDismiss = ionModal.onDidDismiss();
    onDidDismiss.then(() => {
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
