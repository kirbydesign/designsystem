import { forwardRef, Component, Input } from '@angular/core';

import { LabelComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-label',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: LabelComponent,
      useExisting: forwardRef(() => MockLabelComponent),
    },
  ],
})
// start class MockLabelComponent
export class MockLabelComponent {
  @Input() direction: 'vertical' | 'horizontal';
} // end class MockLabelComponent

// #endregion
