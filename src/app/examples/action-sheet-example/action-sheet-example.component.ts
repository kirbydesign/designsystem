import { Component, ViewContainerRef } from '@angular/core';

import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { ActionSheetConfig } from '~/kirby/components/modal/action-sheet/config/action-sheet-config';

@Component({
  selector: 'kirby-action-sheet-example',
  templateUrl: './action-sheet-example.component.html',
})
export class ActionSheetExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  openActionSheet() {
    const config: ActionSheetConfig = {
      header: 'Your action sheet header',
      subheader: 'Your action sheet subheader',
      actions: ['Option 1', 'Option 2', 'Option 3'],
    };
    this.modalController.showActionSheet(config, this.vcRef, this.onActionSelected);
  }

  private onActionSelected(selection: string) {
    console.log(`Action sheet selection: ${selection}`);
  }
}
