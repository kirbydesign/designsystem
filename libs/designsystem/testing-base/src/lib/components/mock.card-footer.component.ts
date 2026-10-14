import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { CardFooterComponent } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-footer',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: CardFooterComponent,
      useExisting: forwardRef(() => MockCardFooterComponent),
    },
  ],
})
export class MockCardFooterComponent {
  @Input() hasPadding: boolean;
}

// #endregion
