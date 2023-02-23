import { Component, forwardRef, Input } from '@angular/core';

import { MockCardHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockCardHeaderComponent,
      useExisting: forwardRef(() => MockMockCardHeaderComponent),
    },
  ],
})
export class MockMockCardHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
  @Input() flagged: CardFlagLevel;
}

// #endregion
