import { Component, forwardRef, Input } from '@angular/core';

import { InputComponent, InputSize } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[kirby-input]',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: InputComponent,
      useExisting: forwardRef(() => MockInputComponent),
    },
  ],
})
export class MockInputComponent {
  @Input() type: string;
  @Input() size: InputSize | `${InputSize}`;
  @Input() borderless: boolean;
  @Input() hasError: boolean;
  @Input() autocomplete: 'on' | 'off';
  @Input() autocorrect: 'on' | 'off';
  @Input() value: string;
  @Input() maxlength: number;
  @Input() inputmode: string;
}

// #endregion
