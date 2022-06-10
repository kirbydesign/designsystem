import { Component, forwardRef } from '@angular/core';

import { ItemResponsiveComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item-responsive',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ItemResponsiveComponent,
      useExisting: forwardRef(() => MockItemResponsiveComponent),
    },
  ],
})
export class MockItemResponsiveComponent {}

// #endregion
