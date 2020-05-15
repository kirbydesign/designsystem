import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { RadioButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RadioButtonComponent,
      useExisting: forwardRef(() => MockRadioButtonComponent),
    },
  ],
})
export class MockRadioButtonComponent {
  @Input() value: any;
  @Input() disabled: any;
  @Output() focusChange = new EventEmitter<boolean>();
}

// #endregion
