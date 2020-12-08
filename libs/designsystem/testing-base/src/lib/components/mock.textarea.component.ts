import { forwardRef, Component, Input } from '@angular/core';

import { TextareaComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'textarea[kirby-textarea]',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TextareaComponent,
      useExisting: forwardRef(() => MockTextareaComponent),
    },
  ],
})
// start class MockTextareaComponent
export class MockTextareaComponent {
  @Input() value: string;
  @Input() borderless: boolean;
  @Input() hasError: boolean;
  @Input() autocomplete: 'on' | 'off';
  @Input() autocorrect: 'on' | 'off';
  @Input() maxlength: number;
} // end class MockTextareaComponent

// #endregion
