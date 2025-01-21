import { Component } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem';
import { ActionSheetConfig } from '@kirbydesign/designsystem';
import { ActionSheetItem } from '@kirbydesign/designsystem';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-action-sheet-example',
  templateUrl: './action-sheet-example.component.html',
  imports: [ButtonComponent],
})
export class ActionSheetExampleComponent {
  constructor(private modalController: ModalController) {}

  showActionSheet() {
    const config: ActionSheetConfig = {
      header: 'Your action sheet header',
      subheader: 'Your action sheet subheader',
      items: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' },
      ],
      cancelButtonText: 'Custom cancel',
    };
    this.modalController.showActionSheet(config, this.onActionSelected);
  }

  private onActionSelected(selection: ActionSheetItem) {
    console.log(`Action sheet selection: ${JSON.stringify(selection)}`);
  }
}
