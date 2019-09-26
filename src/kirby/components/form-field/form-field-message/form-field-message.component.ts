import { Component, Input, ChangeDetectionStrategy, Host } from '@angular/core';

import { FormFieldComponent } from './../form-field.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field-message',
  styleUrls: ['./form-field-message.component.scss'],
  templateUrl: './form-field-message.component.html',
})
export class FormFieldMessageComponent {
  @Input() text: string;
  @Input() position: 'left' | 'right' = 'left';

  // Injecting FormFieldComponent, to ensure the this component is not used outside the context of a form-field.
  constructor(@Host() private _: FormFieldComponent) {}
}
