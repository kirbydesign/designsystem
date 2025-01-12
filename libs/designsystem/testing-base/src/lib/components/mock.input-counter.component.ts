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
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: InputCounterComponent,
      useExisting: forwardRef(() => MockInputCounterComponent),
    },
  ],
  standalone: false,
})
export class MockInputCounterComponent {
  @Input() listenTo: InputComponent | TextareaComponent;
}

// #endregion
