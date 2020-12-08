import { forwardRef, Component, Input } from '@angular/core';

import { EmptyStateComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-empty-state',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: EmptyStateComponent,
      useExisting: forwardRef(() => MockEmptyStateComponent),
    },
  ],
})
// start class MockEmptyStateComponent
export class MockEmptyStateComponent {
  @Input() iconName: string;
  @Input() customIconName: string;
  @Input() title: string;
  @Input() subtitle: string;
} // end class MockEmptyStateComponent

// #endregion
