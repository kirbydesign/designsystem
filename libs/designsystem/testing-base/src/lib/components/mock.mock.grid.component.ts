import { Component, forwardRef, Input } from '@angular/core';

import { MockGridComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-grid',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockGridComponent,
      useExisting: forwardRef(() => MockMockGridComponent),
    },
  ],
})
export class MockMockGridComponent {
  @Input() maxColumns: number;
  @Input() cardConfigurations: GridCardConfiguration[];
}

// #endregion
