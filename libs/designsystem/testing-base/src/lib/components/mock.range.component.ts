import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { RangeComponent } from '@kirbydesign/designsystem';
import { RangeValue } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-range',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RangeComponent,
      useExisting: forwardRef(() => MockRangeComponent),
    },
  ],
})
export class MockRangeComponent {
  @Input() minLabel: string;
  @Input() maxLabel: string;
}

// #endregion
