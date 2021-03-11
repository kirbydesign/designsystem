import { Component, forwardRef, Input } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-icon',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: IconComponent,
      useExisting: forwardRef(() => MockIconComponent),
    },
  ],
})
export class MockIconComponent {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg';
  @Input() name: string;
  @Input() customName: string;
}

// #endregion
