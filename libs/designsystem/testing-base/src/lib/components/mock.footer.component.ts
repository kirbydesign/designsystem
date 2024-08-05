import { Component, forwardRef, Input } from '@angular/core';

import { ModalV2FooterComponent } from '@kirbydesign/designsystem/modal/v2';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-modal-v2-footer',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ModalV2FooterComponent,
      useExisting: forwardRef(() => MockModalV2FooterComponent),
    },
  ],
})
export class MockModalV2FooterComponent {
  @Input() snapToKeyboard: boolean;
  @Input() type: 'inline' | 'fixed';
}

// #endregion
