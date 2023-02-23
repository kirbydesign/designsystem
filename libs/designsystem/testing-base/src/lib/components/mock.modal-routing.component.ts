import { Component, forwardRef } from '@angular/core';

import { ModalRoutingExperimentalComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-routing-wrapper',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ModalRoutingExperimentalComponent,
      useExisting: forwardRef(() => MockModalRoutingExperimentalComponent),
    },
  ],
})
export class MockModalRoutingExperimentalComponent {}

// #endregion
