import { ChangeDetectionStrategy, Component, Input, ContentChildren } from '@angular/core';

import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input() label: string;
  @Input() message: string;

  @ContentChildren(FormFieldMessageComponent) messages;
}
