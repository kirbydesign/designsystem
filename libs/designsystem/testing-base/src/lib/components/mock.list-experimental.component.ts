import { Component, forwardRef } from '@angular/core';

import { ListExperimentalComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-experimental',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ListExperimentalComponent,
      useExisting: forwardRef(() => MockListExperimentalComponent),
    },
  ],
})
export class MockListExperimentalComponent {}

// #endregion
