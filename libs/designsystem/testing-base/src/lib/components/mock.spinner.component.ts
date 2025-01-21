import { Component, forwardRef } from '@angular/core';

import { SpinnerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: SpinnerComponent,
      useExisting: forwardRef(() => MockSpinnerComponent),
    },
  ],
})
export class MockSpinnerComponent {}

// #endregion
