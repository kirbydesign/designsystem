import { Component, ViewContainerRef } from '@angular/core';

import { ActionSheetController } from '~/kirby/components/action-sheet/services/action-sheet.controller';
import { ActionSheetConfig } from '~/kirby/components/action-sheet/config/action-sheet-config';

@Component({
  selector: 'kirby-action-sheet-example',
  templateUrl: './action-sheet-example.component.html',
})
export class ActionSheetExampleComponent {
  constructor(
    private actionSheetController: ActionSheetController,
    private vcRef: ViewContainerRef
  ) {}

  openActionSheet() {
    const config: ActionSheetConfig = {
      title: 'Sample title',
      message: 'Sample message',
      actions: [
        { text: 'Action 0', value: 0 },
        { text: 'Action 1', value: 1 },
        { text: 'Action 2', value: 2 },
      ],
      cancelButtonText: 'Cancel',
    };
    this.actionSheetController.showActionSheet(config, this.vcRef, this.myCallback);
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
