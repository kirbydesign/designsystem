import { Component, Input } from '@angular/core';

import { GridCardConfiguration } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-grid',
  template: '<ng-content></ng-content>',
})
export class MockGridComponent {
  @Input() maxColumns: number;
  @Input() cardConfigurations: GridCardConfiguration[];
}

// #endregion
