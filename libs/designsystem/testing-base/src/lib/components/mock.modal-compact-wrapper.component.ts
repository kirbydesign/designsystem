import { Component, forwardRef, Input } from '@angular/core';

import { ModalCompactWrapperComponent, ModalConfig } from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-compact-wrapper',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
