import { forwardRef, Component, Input } from '@angular/core';

import { CircularProgressComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-circular-progress',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CircularProgressComponent,
      useExisting: forwardRef(() => MockCircularProgressComponent),
    },
  ],
})
export class MockCircularProgressComponent {
  @Input() value: number;
}

// #endregion
