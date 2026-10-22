import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { FormFieldMessageComponent } from '@kirbydesign/designsystem/form-field';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-form-field-message',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
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
