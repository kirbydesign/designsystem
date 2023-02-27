import { Component, forwardRef, Input } from '@angular/core';

import { ModalWrapperComponent } from '@kirbydesign/designsystem';
import { ModalConfig } from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-wrapper',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalWrapperComponent,
      useExisting: forwardRef(() => MockModalWrapperComponent),
    },
  ],
})
export class MockModalWrapperComponent {
  @Input() config: ModalConfig;

  addModalElement() {}
  removeModalElement() {}
}

// #endregion
