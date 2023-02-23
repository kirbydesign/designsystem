import { Component, forwardRef, Input } from '@angular/core';

import { MockIconComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-icon',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockIconComponent,
      useExisting: forwardRef(() => MockMockIconComponent),
    },
  ],
})
export class MockMockIconComponent {
  @Input() size: IconSize | `${IconSize}`;
  @Input() name: string;
  @Input() customName: string;
}

// #endregion
