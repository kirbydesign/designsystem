import { forwardRef, Component, Input } from '@angular/core';

import { ModalFooterComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-footer',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalFooterComponent,
      useExisting: forwardRef(() => MockModalFooterComponent),
    },
  ],
})
export class MockModalFooterComponent {
  @Input() snapToKeyboard: boolean;
}

// #endregion
