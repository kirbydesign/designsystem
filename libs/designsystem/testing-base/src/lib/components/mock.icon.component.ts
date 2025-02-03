import { Component, forwardRef, Input } from '@angular/core';

import { IconComponent, IconSize } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-icon',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: IconComponent,
      useExisting: forwardRef(() => MockIconComponent),
    },
  ],
})
export class MockIconComponent {
  @Input() size: IconSize | `${IconSize}`;
  @Input() name: string;
}

// #endregion
