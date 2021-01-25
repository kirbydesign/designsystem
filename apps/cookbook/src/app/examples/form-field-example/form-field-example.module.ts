import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldInputDateExampleComponent } from '~/app/examples/form-field-example/examples/input/date.component';

import { KirbyModule } from '@kirbydesign/designsystem';

import { FormFieldInputBorderlessExampleComponent } from './examples/input/borderless';
import { FormFieldInputCounterExampleComponent } from './examples/input/counter';
import { FormFieldInputDefaultExampleComponent } from './examples/input/default';
import { FormFieldInputDisabledExampleComponent } from './examples/input/disabled';
import { FormFieldInputErrorExampleComponent } from './examples/input/error';
import { FormFieldFocusExampleComponent } from './examples/input/focus';
import { FormFieldInputLabelExampleComponent } from './examples/input/label';
import { FormFieldInputLabelMessageExampleComponent } from './examples/input/label-message';
import { FormFieldInputNumericExampleComponent } from './examples/input/numeric.component';
import { FormFieldTextareaCounterExampleComponent } from './examples/textarea/counter';
import { FormFieldTextareaDefaultExampleComponent } from './examples/textarea/default';
import { FormFieldTextareaLabelExampleComponent } from './examples/textarea/label';

const COMPONENT_DECLARATIONS = [
  FormFieldInputDefaultExampleComponent,
  FormFieldInputLabelExampleComponent,
  FormFieldInputLabelMessageExampleComponent,
  FormFieldInputCounterExampleComponent,
  FormFieldInputNumericExampleComponent,
  FormFieldInputDateExampleComponent,
  FormFieldInputDisabledExampleComponent,
  FormFieldInputErrorExampleComponent,
  FormFieldInputBorderlessExampleComponent,
  FormFieldFocusExampleComponent,
  FormFieldTextareaDefaultExampleComponent,
  FormFieldTextareaLabelExampleComponent,
  FormFieldTextareaCounterExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FormFieldExamplesModule {}
