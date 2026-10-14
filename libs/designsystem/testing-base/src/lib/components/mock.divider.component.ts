import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { DividerComponent } from '@kirbydesign/designsystem/divider';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-divider',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: DividerComponent,
      useExisting: forwardRef(() => MockDividerComponent),
    },
  ],
})
export class MockDividerComponent {
  @Input() hasMargin: boolean;
}

// #endregion
