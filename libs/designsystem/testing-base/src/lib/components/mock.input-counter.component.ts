import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import {
  InputComponent,
  InputCounterComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem/form-field';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-input-counter',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
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
