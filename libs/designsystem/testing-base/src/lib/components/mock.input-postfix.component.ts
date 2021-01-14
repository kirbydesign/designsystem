import { forwardRef, Component, Input } from '@angular/core';

import { InputPostfixComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-input-postfix',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputPostfixComponent,
      useExisting: forwardRef(() => MockInputPostfixComponent),
    },
  ],
})
export class MockInputPostfixComponent {
  @Input() cssClass: string;
}

// #endregion
