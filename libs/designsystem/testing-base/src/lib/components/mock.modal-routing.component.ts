import { Component, forwardRef } from '@angular/core';

import { ModalV2RoutingComponent } from '@kirbydesign/designsystem/modal/v2';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-v2-routing-wrapper',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalV2RoutingComponent,
      useExisting: forwardRef(() => MockModalV2RoutingComponent),
    },
  ],
})
export class MockModalV2RoutingComponent {}

// #endregion
