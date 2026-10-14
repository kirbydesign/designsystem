import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { CardFlagLevel, CardHeaderComponent } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-header',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: CardHeaderComponent,
      useExisting: forwardRef(() => MockCardHeaderComponent),
    },
  ],
})
export class MockCardHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
  @Input() flagged: CardFlagLevel;
  @Input() hasPadding: boolean;
}

// #endregion
