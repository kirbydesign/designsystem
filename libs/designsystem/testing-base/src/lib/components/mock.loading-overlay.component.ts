import { forwardRef, Component, Input } from '@angular/core';

import { LoadingOverlayComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-loading-overlay',
  template: '<ng-content></ng-content>',
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
}

// #endregion
