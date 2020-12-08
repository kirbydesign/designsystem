import { forwardRef, Component, Input } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-icon',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: IconComponent,
      useExisting: forwardRef(() => MockIconComponent),
    },
  ],
})
// start class MockIconComponent
export class MockIconComponent {
  @Input() name: string;
  @Input() customName: string;
} // end class MockIconComponent

// #endregion
