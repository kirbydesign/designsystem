import { Component } from '@angular/core';

import { FabSheetConfig } from './../../../kirby/components/fab-sheet/config/fab-sheet-config';
import { ActionSheetItem } from '~/kirby/components/modal/action-sheet/config/action-sheet-item';

@Component({
  selector: 'kirby-fab-sheet-example',
  templateUrl: './fab-sheet-example.component.html',
})
export class FabSheetExampleComponent {
  public config: FabSheetConfig = {
    horizontalAlignment: 'center',
    actionSheetConfig: {
      header: 'Need some help?',
      subheader: 'Here is a message where we can put absolutely anything we want.',
      items: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' },
      ],
    },
  };

  public onActionSelected(selection: ActionSheetItem) {
    console.log('action selected:', selection);
  }
}
