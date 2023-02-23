import { Component, forwardRef, Input } from '@angular/core';

import { MockCardComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockCardComponent,
      useExisting: forwardRef(() => MockMockCardComponent),
    },
  ],
})
export class MockMockCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() backgroundImageUrl: string;
  @Input() hasPadding: boolean;
  @Input() sizes: { [size: string]: number };
  @Input() mode: 'flat' | 'highlighted';
}

// #endregion
