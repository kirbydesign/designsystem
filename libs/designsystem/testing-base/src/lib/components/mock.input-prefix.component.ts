import { forwardRef, Component, Input } from '@angular/core';

import { InputPrefixComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-input-prefix',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputPrefixComponent,
      useExisting: forwardRef(() => MockInputPrefixComponent),
    },
  ],
})
export class MockInputPrefixComponent {
  @Input() cssClass: string;
}

// #endregion
