import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { FormFieldInputMediumBorderlessExampleComponent } from './examples/input-medium/borderless';
import { FormFieldInputMediumCounterExampleComponent } from './examples/input-medium/counter';
import { FormFieldInputMediumDefaultExampleComponent } from './examples/input-medium/default';
import { FormFieldInputMediumDisabledExampleComponent } from './examples/input-medium/disabled';
import { FormFieldInputMediumErrorExampleComponent } from './examples/input-medium/error';
import { FormFieldInputMediumLabelExampleComponent } from './examples/input-medium/label';
import { FormFieldInputMediumLabelMessageExampleComponent } from './examples/input-medium/label-message';
import { FormFieldInputMediumNumericExampleComponent } from './examples/input-medium/numeric';
import { FormFieldInputBorderlessExampleComponent } from './examples/input/borderless';
import { FormFieldInputCounterExampleComponent } from './examples/input/counter';
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

const COMPONENT_DECLARATIONS = [
  FormFieldInputDefaultExampleComponent,
  FormFieldInputLabelExampleComponent,
  FormFieldInputLabelMessageExampleComponent,
  FormFieldInputCounterExampleComponent,
  FormFieldInputNumericExampleComponent,
  FormFieldInputDisabledExampleComponent,
  FormFieldInputErrorExampleComponent,
  FormFieldInputBorderlessExampleComponent,
  FormFieldFocusExampleComponent,
  FormFieldInputMediumDefaultExampleComponent,
  FormFieldInputMediumLabelExampleComponent,
  FormFieldInputMediumLabelMessageExampleComponent,
  FormFieldInputMediumCounterExampleComponent,
  FormFieldInputMediumNumericExampleComponent,
  FormFieldInputMediumDisabledExampleComponent,
  FormFieldInputMediumErrorExampleComponent,
  FormFieldInputMediumBorderlessExampleComponent,
  FormFieldTextareaDefaultExampleComponent,
  FormFieldTextareaLabelExampleComponent,
  FormFieldTextareaCounterExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FormFieldExamplesModule {}
