import { Component } from '@angular/core';

import { ActionSheetItem } from '~/kirby/components/modal/action-sheet/config/action-sheet-item';

@Component({
  selector: 'kirby-fab-sheet-example',
  templateUrl: './fab-sheet-example.component.html',
})
export class FabSheetExampleComponent {
  public horizontalAlignment: string = 'center';
  public header: string = 'Your action sheet header';
  public subheader: string = 'Your action sheet subheader';
  public items: Array<ActionSheetItem> = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  public onActionSelected(selection: ActionSheetItem) {
    console.log('action selected:', selection);
  }
}
