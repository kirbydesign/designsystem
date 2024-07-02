import { Component, forwardRef, Input } from '@angular/core';

import { BadgeComponent } from '@kirbydesign/designsystem/badge';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-badge',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: BadgeComponent,
      useExisting: forwardRef(() => MockBadgeComponent),
    },
  ],
})
export class MockBadgeComponent {
  @Input() text: string;
  @Input() size: boolean;
}

// #endregion
