import { forwardRef, Component, Input } from '@angular/core';

import { CardComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-card',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CardComponent,
      useExisting: forwardRef(() => MockCardComponent),
    },
  ],
})
// start class MockCardComponent
export class MockCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() hasPadding: boolean;
  @Input() sizes: { [size: string]: number };
  @Input() mode: 'flat' | 'highlighted';
} // end class MockCardComponent

// #endregion
