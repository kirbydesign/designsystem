import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { FormFieldInputDefaultExampleComponent } from './examples/input/default';
import { FormFieldInputLabelExampleComponent } from './examples/input/label';
import { FormFieldInputLabelMessageExampleComponent } from './examples/input/label-message';
import { FormFieldInputNumericExampleComponent } from './examples/input/numeric';
import { FormFieldInputDisabledExampleComponent } from './examples/input/disabled';
import { FormFieldInputStateWarningExampleComponent } from './examples/input/state-warning';
import { FormFieldInputStateDangerExampleComponent } from './examples/input/state-danger';
import { FormFieldTextareaDefaultExampleComponent } from './examples/textarea/default';
import { FormFieldTextareaLabelExampleComponent } from './examples/textarea/label';

const COMPONENT_DECLARATIONS = [
  FormFieldInputDefaultExampleComponent,
  FormFieldInputLabelExampleComponent,
  FormFieldInputLabelMessageExampleComponent,
  FormFieldInputNumericExampleComponent,
  FormFieldInputDisabledExampleComponent,
  FormFieldInputStateWarningExampleComponent,
  FormFieldInputStateDangerExampleComponent,
  FormFieldTextareaDefaultExampleComponent,
  FormFieldTextareaLabelExampleComponent,
];

@NgModule({
  imports: [KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FormFieldExamplesModule {}
