import { Component } from '@angular/core';
import { FormFieldInputLabelExampleComponent } from '../form-field-example/examples/input/label';
import { LabelExampleDirectionComponent } from './examples/direction';

@Component({
  selector: 'cookbook-label-example',
  templateUrl: './label-example.component.html',
  styleUrls: ['./label-example.component.scss'],
  imports: [FormFieldInputLabelExampleComponent, LabelExampleDirectionComponent],
})
export class LabelExampleComponent {}
