import { Component, forwardRef, Input } from '@angular/core';

import { Flavor, ModalV2WrapperComponent } from '@kirbydesign/designsystem/modal/v2';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-v2-wrapper',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalV2WrapperComponent,
      useExisting: forwardRef(() => MockModalV2WrapperComponent),
    },
  ],
})
export class MockModalV2WrapperComponent {
  @Input() flavor: Flavor;
  @Input() title: string;
  @Input() hasCollapsibleTitle: boolean;
  @Input() scrollDisabled: boolean;
}

// #endregion
