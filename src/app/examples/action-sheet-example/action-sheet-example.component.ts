import { Component, ViewContainerRef } from '@angular/core';

import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { ActionSheetConfig } from '~/kirby/components/modal/action-sheet/config/action-sheet-config';

@Component({
  selector: 'kirby-action-sheet-example',
  templateUrl: './action-sheet-example.component.html',
})
export class ActionSheetExampleComponent {
  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  openActionSheet(e: any) {
    const config: ActionSheetConfig = {
      title: 'Brug for hjælp?',
      message: 'Here is a message where we can put absolutely anything we want.',
      actions: ['Vis spørgsmål og svar', 'Ring os op'],
    };
    this.modalController.showActionSheetWindow(config, this.vcRef, this.myCallback);
  }

  myCallback = (selection: string) => {
    console.log('Dialog selection: ' + selection);
    if (selection == 'Option 1') {
      //Do action1
    } else if (selection == 'Option 2') {
      //Do action2
    }
  };
}
