import { Component, forwardRef, Input } from '@angular/core';

import { BadgeComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: BadgeComponent,
      useExisting: forwardRef(() => MockBadgeComponent),
    },
  ],
})
export class MockBadgeComponent {
  @Input() size: 'md' | 'sm';
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
