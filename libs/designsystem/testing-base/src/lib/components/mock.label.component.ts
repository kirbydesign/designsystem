import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { LabelComponent } from '@kirbydesign/designsystem/item';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-label',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: LabelComponent,
      useExisting: forwardRef(() => MockLabelComponent),
    },
  ],
})
export class MockLabelComponent {
  @Input() direction: 'vertical' | 'horizontal';
}

// #endregion
