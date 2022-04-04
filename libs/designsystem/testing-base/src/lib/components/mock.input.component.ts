import { Component, forwardRef, Input } from '@angular/core';

import { InputComponent, InputSize } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'input[kirby-input]',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputComponent,
      useExisting: forwardRef(() => MockInputComponent),
    },
  ],
})
export class MockInputComponent {
  @Input() type: string;
  @Input() size: InputSize;
  @Input() borderless: boolean;
  @Input() hasError: boolean;
  @Input() autocomplete: 'on' | 'off';
  @Input() autocorrect: 'on' | 'off';
  @Input() value: string;
  @Input() maxlength: number;
  @Input() inputmode: string;
}

// #endregion
