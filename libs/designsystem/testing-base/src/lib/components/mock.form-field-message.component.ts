import { Component, forwardRef, Input } from '@angular/core';

import { FormFieldMessageComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-form-field-message',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: FormFieldMessageComponent,
      useExisting: forwardRef(() => MockFormFieldMessageComponent),
    },
  ],
})
export class MockFormFieldMessageComponent {
  @Input() text: string;
  @Input() position: 'left' | 'right';
}

// #endregion
