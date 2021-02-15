import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cookbook-form-field-example-configuration',
  templateUrl: './form-field-example-configuration.component.html',
  styleUrls: ['./form-field-example-configuration.component.scss'],
})
export class FormFieldExampleConfigurationComponent {
  @Input() size: 'md' | 'lg';
  @Output() sizeChanged = new EventEmitter<string>();
}
