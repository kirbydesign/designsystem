import { forwardRef, Component, Input } from '@angular/core';

import { GridComponent, GridCardConfiguration } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-grid',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: GridComponent,
      useExisting: forwardRef(() => MockGridComponent),
    },
  ],
})
export class MockGridComponent {
  @Input() maxColumns: number;
  @Input() cardConfigurations: GridCardConfiguration[];
}

// #endregion
