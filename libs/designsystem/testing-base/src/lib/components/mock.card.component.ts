import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { CardComponent, CardVariant } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: CardComponent,
      useExisting: forwardRef(() => MockCardComponent),
    },
  ],
})
export class MockCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() backgroundImageUrl: string;
  @Input() hasPadding: boolean;
  @Input() sizes: { [size: string]: number };
  @Input() variant: CardVariant;
}

// #endregion
