import { Component, forwardRef, Input } from '@angular/core';

import { MockBadgeComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockBadgeComponent,
      useExisting: forwardRef(() => MockMockBadgeComponent),
    },
  ],
})
export class MockMockBadgeComponent {
  @Input() text: string;
}

// #endregion
