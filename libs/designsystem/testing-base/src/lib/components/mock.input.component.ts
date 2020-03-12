import { forwardRef, Component, Input } from '@angular/core';

import { InputComponent } from '@kirbydesign/designsystem';

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
}

// #endregion
