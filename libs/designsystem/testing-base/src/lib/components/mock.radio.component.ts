import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { RadioComponent } from '@kirbydesign/designsystem/radio';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: RadioComponent,
      useExisting: forwardRef(() => MockRadioComponent),
    },
  ],
})
export class MockRadioComponent {
  @Input() value: any;
  @Input() text: string;
  @Input() size: 'xs' | 'sm' | 'md';
  @Input() disabled: boolean;
}

// #endregion
