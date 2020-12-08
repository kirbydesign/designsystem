import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { SlideButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-slide-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SlideButtonComponent,
      useExisting: forwardRef(() => MockSlideButtonComponent),
    },
  ],
})
// start class MockSlideButtonComponent
export class MockSlideButtonComponent {
  @Input() text: string;
  @Input() expand: 'block';
  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();
} // end class MockSlideButtonComponent

// #endregion
