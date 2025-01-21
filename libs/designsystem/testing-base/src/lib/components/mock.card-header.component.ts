import { Component, forwardRef, Input } from '@angular/core';

import { CardFlagLevel, CardHeaderComponent } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-header',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
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
