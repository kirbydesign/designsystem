import { Component, forwardRef, Input, TemplateRef } from '@angular/core';

import { ModalConfig, ModalWrapperComponent } from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-wrapper',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalWrapperComponent,
      useExisting: forwardRef(() => MockModalWrapperComponent),
    },
  ],
})
export class MockModalWrapperComponent {
  @Input() scrollDisabled: boolean;
  @Input() config: ModalConfig;
  @Input() content: TemplateRef<any>;

  addModalElement() {
    // NOOP
  }
  removeModalElement() {
    // NOOP
  }
}

// #endregion
