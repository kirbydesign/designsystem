import { Component } from '@angular/core';

import { FabSheetConfig } from './../../../kirby/components/fab-sheet/config/fab-sheet-config';

@Component({
  selector: 'kirby-fab-sheet-example',
  templateUrl: './fab-sheet-example.component.html',
})
export class FabSheetExampleComponent {
  public config: FabSheetConfig = {
    openIconName: 'more',
    closeIconName: 'close',
    actions: [
      { text: 'Action 0', value: 0 },
      { text: 'Action 1', value: 1 },
      { text: 'Action 2', value: 2 },
    ],
  };
}
