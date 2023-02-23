import { Component, forwardRef, Input } from '@angular/core';

import { MockFlagComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-flag',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockFlagComponent,
      useExisting: forwardRef(() => MockMockFlagComponent),
    },
  ],
})
export class MockMockFlagComponent {
  @Input() size: 'xs' | 'sm' | 'md';
  @Input() themeColor: 'success' | 'warning' | 'danger' | 'semi-light' | 'transparent';
}

// #endregion
