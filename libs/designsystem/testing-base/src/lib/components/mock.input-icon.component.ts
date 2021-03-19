import { Component, forwardRef, Input } from '@angular/core';

import { InputIconComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-input-icon',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: InputIconComponent,
      useExisting: forwardRef(() => MockInputIconComponent),
    },
  ],
})
export class MockInputIconComponent {
  @Input() cssClass: string;
  @Input() icon: string;
}

// #endregion
