import { Component, forwardRef, Input } from '@angular/core';

import { ModalCompactWrapperComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-compact-wrapper',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalCompactWrapperComponent,
      useExisting: forwardRef(() => MockModalCompactWrapperComponent),
    },
  ],
})
export class MockModalCompactWrapperComponent {
  @Input() config: ModalConfig;
}

// #endregion
