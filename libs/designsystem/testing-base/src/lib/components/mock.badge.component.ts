import { forwardRef, Component, Input } from '@angular/core';

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
  @Input() text: string;
}

// #endregion
