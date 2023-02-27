import { Component, forwardRef, Input } from '@angular/core';

import { ModalFooterExperimentalComponent } from '@kirbydesign/designsystem/modal/experimental';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-footer-experimental',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalFooterExperimentalComponent,
      useExisting: forwardRef(() => MockModalFooterExperimentalComponent),
    },
  ],
})
export class MockModalFooterExperimentalComponent {
  @Input() snapToKeyboard: boolean;
  @Input() type: 'inline' | 'fixed';
}

// #endregion
