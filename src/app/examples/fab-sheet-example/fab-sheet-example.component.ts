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
    closeIconName: 'close',
    actions: ['Action 0', 'Action 1', 'Action 2'],
  };

  onActionSelected(selection: string) {
    this.selectedAction = selection ? selection : this.selectedAction;
  }
}
