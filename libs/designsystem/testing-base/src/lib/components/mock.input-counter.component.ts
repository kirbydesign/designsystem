import { Component, forwardRef, Input } from '@angular/core';

import {
  InputComponent,
  InputCounterComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-input-counter',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputCounterComponent,
      useExisting: forwardRef(() => MockInputCounterComponent),
    },
  ],
})
export class MockInputCounterComponent {
  @Input() listenTo: InputComponent | TextareaComponent;
}

// #endregion
