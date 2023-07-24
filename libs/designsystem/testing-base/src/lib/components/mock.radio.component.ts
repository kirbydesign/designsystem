import { Component, forwardRef, Input } from '@angular/core';

import { RadioComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio',
  template: '<ng-content></ng-content>',
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
  @Input() size?: 'xs' | 'sm' | 'md';
  @Input() disabled: boolean;
}

// #endregion
