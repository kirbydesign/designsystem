import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { TextareaComponent } from '@kirbydesign/designsystem/form-field';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'textarea[kirby-textarea]',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: TextareaComponent,
      useExisting: forwardRef(() => MockTextareaComponent),
    },
  ],
})
export class MockTextareaComponent {
  @Input() value: string;
  @Input() borderless: boolean;
  @Input() hasError: boolean;
  @Input() autocomplete: 'on' | 'off';
  @Input() autocorrect: 'on' | 'off';
  @Input() maxlength: number;
  @Output() hasErrorChange = new EventEmitter<boolean>();
}

// #endregion
