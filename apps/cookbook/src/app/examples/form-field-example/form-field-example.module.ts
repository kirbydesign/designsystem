import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { FormFieldInputBorderlessExampleComponent } from './examples/input/borderless';
import { FormFieldInputCounterExampleComponent } from './examples/input/counter';
import { FormFieldInputDateExampleComponent } from './examples/input/date.component';
import { FormFieldInputDefaultExampleComponent } from './examples/input/default';
import { FormFieldInputDisabledExampleComponent } from './examples/input/disabled';
import { FormFieldInputErrorExampleComponent } from './examples/input/error';
import { FormFieldFocusExampleComponent } from './examples/input/focus';
import { FormFieldInputLabelExampleComponent } from './examples/input/label';
import { FormFieldInputLabelMessageExampleComponent } from './examples/input/label-message';
import { FormFieldInputNumericExampleComponent } from './examples/input/numeric';
import { FormFieldTextareaCounterExampleComponent } from './examples/textarea/counter';
import { FormFieldTextareaDefaultExampleComponent } from './examples/textarea/default';
import { FormFieldTextareaLabelExampleComponent } from './examples/textarea/label';
import { FormFieldExampleConfigurationComponent } from './form-field-example-configuration-component/form-field-example-configuration.component';

const COMPONENT_DECLARATIONS = [
  FormFieldExampleConfigurationComponent,
  FormFieldInputDefaultExampleComponent,
  FormFieldInputLabelExampleComponent,
  FormFieldInputLabelMessageExampleComponent,
  FormFieldInputCounterExampleComponent,
  FormFieldInputDateExampleComponent,
  FormFieldInputDisabledExampleComponent,
  FormFieldInputErrorExampleComponent,
  FormFieldInputBorderlessExampleComponent,
  FormFieldFocusExampleComponent,
  FormFieldTextareaDefaultExampleComponent,
  FormFieldTextareaLabelExampleComponent,
  FormFieldTextareaCounterExampleComponent,
  FormFieldInputNumericExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FormFieldExamplesModule {}
