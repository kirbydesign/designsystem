import { Component } from '@angular/core';

import { FabSheetConfig } from './../../../kirby/components/fab-sheet/config/fab-sheet-config';

@Component({
  selector: 'kirby-fab-sheet-example',
  templateUrl: './fab-sheet-example.component.html',
})
export class FabSheetExampleComponent {
  selectedAction: string;

  public config: FabSheetConfig = {
    openIconName: 'more',
    alignment: 'bottom',
    header: 'Need some help?',
    subheader: 'Here is a message where we can put absolutely anything we want.',
    actions: ['Action 0', 'Action 1'],
  };

  public onActionSelected(selection: string) {
    console.log('action selected:', selection);
    this.selectedAction = selection ? selection : this.selectedAction;
  }
}
