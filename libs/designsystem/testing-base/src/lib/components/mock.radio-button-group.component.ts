import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { RadioButtonGroupComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio-button-group',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RadioButtonGroupComponent,
      useExisting: forwardRef(() => MockRadioButtonGroupComponent),
    },
  ],
})
export class MockRadioButtonGroupComponent {
  @Input() value: any;
  @Input() disabled: boolean;
  @Output() valueChange = new EventEmitter();
}

// #endregion
