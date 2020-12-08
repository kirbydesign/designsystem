import { forwardRef, Component, Input } from '@angular/core';

import { CardHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
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
