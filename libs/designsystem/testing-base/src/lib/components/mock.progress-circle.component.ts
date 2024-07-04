import { Component, forwardRef, Input } from '@angular/core';

import { ProgressCircleComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-progress-circle',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ProgressCircleComponent,
      useExisting: forwardRef(() => MockProgressCircleComponent),
    },
  ],
})
export class MockProgressCircleComponent {
  @Input() value: number;
  @Input() size: 'sm' | 'md' | 'lg';
  @Input() themeColor: 'success' | 'warning' | 'danger';
}

// #endregion
