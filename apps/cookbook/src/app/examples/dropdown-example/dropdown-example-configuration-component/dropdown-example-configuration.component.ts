import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioComponent, RadioGroupComponent } from '@kirbydesign/designsystem/radio';
import { FormFieldComponent } from '@kirbydesign/designsystem/form-field';

@Component({
  selector: 'cookbook-dropdown-example-configuration',
  templateUrl: './dropdown-example-configuration.component.html',
  styleUrls: ['./dropdown-example-configuration.component.scss'],
  imports: [RadioGroupComponent, RadioComponent, FormFieldComponent],
})
export class DropdownExampleConfigurationComponent {
  @Input() size: 'sm' | 'md' = 'md';
  @Output() sizeChanged = new EventEmitter<string>();
}
