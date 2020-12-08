import { forwardRef, Component, Input } from '@angular/core';

import { ListSectionHeaderComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-list-section-header',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ListSectionHeaderComponent,
      useExisting: forwardRef(() => MockListSectionHeaderComponent),
    },
  ],
})
// start class MockListSectionHeaderComponent
export class MockListSectionHeaderComponent {
  @Input() title: string;
} // end class MockListSectionHeaderComponent

// #endregion
