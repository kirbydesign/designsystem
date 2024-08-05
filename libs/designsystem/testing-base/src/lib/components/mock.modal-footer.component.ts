import { Component, forwardRef, Input } from '@angular/core';

import { ModalFooterComponent } from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-footer',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalFooterComponent,
      useExisting: forwardRef(() => MockModalFooterComponent),
    },
  ],
})
export class MockModalFooterComponent {
  @Input() snapToKeyboard: boolean;
  @Input() type: 'inline' | 'fixed';
}

// #endregion
