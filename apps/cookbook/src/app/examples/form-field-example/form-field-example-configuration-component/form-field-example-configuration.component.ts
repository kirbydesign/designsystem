import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import { RadioModule } from '@kirbydesign/designsystem/radio';

@Component({
  selector: 'cookbook-form-field-example-configuration',
  templateUrl: './form-field-example-configuration.component.html',
  styleUrls: ['./form-field-example-configuration.component.scss'],
  imports: [RadioModule],
})
export class FormFieldExampleConfigurationComponent {
  items = [
    { title: 'Medium (md)', value: InputSize.medium },
    { title: 'Large (lg) - default', value: InputSize.large },
  ];
  @Input() size = InputSize.large;
  @Output() sizeChange = new EventEmitter<InputSize>();

  onChange = (selected) => {
    this.size = selected.value;
    this.sizeChange.emit(selected.value);
  };
}
