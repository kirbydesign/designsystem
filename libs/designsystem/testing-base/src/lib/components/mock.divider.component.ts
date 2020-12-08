import { forwardRef, Component, Input } from '@angular/core';

import { DividerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-divider',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: DividerComponent,
      useExisting: forwardRef(() => MockDividerComponent),
    },
  ],
})
// start class MockDividerComponent
export class MockDividerComponent {
  @Input() hasMargin: boolean;
} // end class MockDividerComponent

// #endregion
