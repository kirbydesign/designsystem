import { Component, Input, ChangeDetectionStrategy, Host } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field-message',
  styleUrls: ['./form-field-message.component.scss'],
  templateUrl: './form-field-message.component.html',
})
export class FormFieldMessageComponent {
  @Input() text: string;
  @Input() position: 'left' | 'right' = 'left';
}
