import { Component, forwardRef, Input } from '@angular/core';

import { MockDividerComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-divider',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockDividerComponent,
      useExisting: forwardRef(() => MockMockDividerComponent),
    },
  ],
})
export class MockMockDividerComponent {
  @Input() hasMargin: boolean;
}

// #endregion
