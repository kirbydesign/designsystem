import { Component } from '@angular/core';

import { ActionSheetItem } from '~/kirby/components/modal/action-sheet/config/action-sheet-item';

@Component({
  selector: 'kirby-fab-sheet-example',
  templateUrl: './fab-sheet-example.component.html',
})
export class FabSheetExampleComponent {
  public items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  public onActionSelected(selection: ActionSheetItem) {
    console.log(`Action sheet selection: ${JSON.stringify(selection)}`);
  }
}
