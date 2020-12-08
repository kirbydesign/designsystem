import { forwardRef, Component, Input } from '@angular/core';

import { CardHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CardHeaderComponent,
      useExisting: forwardRef(() => MockCardHeaderComponent),
    },
  ],
})
// start class MockCardHeaderComponent
export class MockCardHeaderComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isTitleBold: boolean;
} // end class MockCardHeaderComponent

// #endregion
