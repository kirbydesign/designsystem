import { Component, forwardRef, Input } from '@angular/core';

import { ModalWrapperExperimentalComponent } from '@kirbydesign/designsystem/modal/experimental';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-wrapper-experimental',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalWrapperExperimentalComponent,
      useExisting: forwardRef(() => MockModalWrapperExperimentalComponent),
    },
  ],
})
export class MockModalWrapperExperimentalComponent {
  @Input() title: string;
  @Input() hasCollapsibleTitle: boolean;
  @Input() scrollDisabled: boolean;
}

// #endregion
