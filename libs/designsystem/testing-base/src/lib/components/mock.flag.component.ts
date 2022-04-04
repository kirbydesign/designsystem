import { Component, forwardRef, Input } from '@angular/core';

import { FlagComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-flag',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FlagComponent,
      useExisting: forwardRef(() => MockFlagComponent),
    },
  ],
})
export class MockFlagComponent {
  @Input() size: 'xs' | 'sm' | 'md';
  @Input() themeColor: 'success' | 'warning' | 'danger' | 'semi-light' | 'transparent';
}

// #endregion
