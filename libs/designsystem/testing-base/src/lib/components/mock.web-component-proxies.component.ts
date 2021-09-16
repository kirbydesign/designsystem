import { Component, forwardRef, Input } from '@angular/core';

import { KirbyBadge } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: KirbyBadge,
      useExisting: forwardRef(() => MockBadgeComponent),
    },
  ],
})
export class MockBadgeComponent {
  @Input() text: string;
  @Input() themeColor:
    | 'danger'
    | 'dark'
    | 'light'
    | 'medium'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning'
    | 'white';
}

// #endregion
