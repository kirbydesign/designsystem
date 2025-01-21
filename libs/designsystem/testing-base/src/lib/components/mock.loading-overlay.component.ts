import { Component, forwardRef, Input } from '@angular/core';

import { LoadingOverlayComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-loading-overlay',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: LoadingOverlayComponent,
      useExisting: forwardRef(() => MockLoadingOverlayComponent),
    },
  ],
})
export class MockLoadingOverlayComponent {
  @Input() isLoading: boolean;
  @Input() showBackdrop: boolean;
  @Input() hideContent: boolean;
}

// #endregion
