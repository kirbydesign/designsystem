import { Component } from '@angular/core';
import { LabelExampleItemComponent } from './examples/item';
import { FormFieldTextareaLabelExampleComponent } from './examples/textarea/label';
import { LabelFormFieldInputLabelExampleComponent } from './examples/label';
import { RadioInFormFieldExampleComponent } from './examples/in-form-field';

@Component({
  selector: 'cookbook-label-example',
  templateUrl: './label-example.component.html',
  imports: [
    LabelExampleItemComponent,
    FormFieldTextareaLabelExampleComponent,
    LabelFormFieldInputLabelExampleComponent,
    RadioInFormFieldExampleComponent,
  ],
})
export class LabelExampleComponent {}
