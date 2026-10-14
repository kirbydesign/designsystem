import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-loading-overlay',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
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
