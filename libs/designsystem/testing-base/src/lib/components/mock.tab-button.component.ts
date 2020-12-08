import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { TabButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-tab-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TabButtonComponent,
      useExisting: forwardRef(() => MockTabButtonComponent),
    },
  ],
})
// start class MockTabButtonComponent
export class MockTabButtonComponent {
  @Input() routerLink: string;
  @Output() click = new EventEmitter<Event>();
} // end class MockTabButtonComponent

// #endregion
