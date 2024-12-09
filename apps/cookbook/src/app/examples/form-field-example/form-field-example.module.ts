import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import {
  FormFieldModule,
  InputComponent,
  TextareaComponent,
} from '@kirbydesign/designsystem/form-field';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { PageModule } from '@kirbydesign/designsystem/page';
import { ExampleConfigurationWrapperComponent } from '../example-configuration-wrapper/example-configuration-wrapper.component';
import { FormFieldInputAffixExampleComponent } from './examples/input/affix';
import { FormFieldInputBorderlessExampleComponent } from './examples/input/borderless';
import { FormFieldInputColorExampleComponent } from './examples/input/color';
import { FormFieldInputCounterExampleComponent } from './examples/input/counter';
import { FormFieldInputDateExampleComponent } from './examples/input/date';
import { FormFieldInputDateNativeExampleComponent } from './examples/input/date-native';
import { FormFieldInputDecimalMaskExampleComponent } from './examples/input/decimal-mask';
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
import { FormFieldExampleComponent } from './form-field-example.component';

const COMPONENT_DECLARATIONS = [
  FormFieldExampleConfigurationComponent,
  FormFieldInputDefaultExampleComponent,
  FormFieldInputLabelExampleComponent,
  FormFieldInputLabelMessageExampleComponent,
  FormFieldInputCounterExampleComponent,
  FormFieldInputNumericExampleComponent,
  FormFieldInputDecimalMaskExampleComponent,
  FormFieldInputDateExampleComponent,
  FormFieldInputDateNativeExampleComponent,
  FormFieldInputDisabledExampleComponent,
  FormFieldInputAffixExampleComponent,
  FormFieldInputErrorExampleComponent,
  FormFieldInputBorderlessExampleComponent,
  FormFieldInputColorExampleComponent,
  FormFieldFocusExampleComponent,
  FormFieldTextareaDefaultExampleComponent,
  FormFieldTextareaLabelExampleComponent,
  FormFieldTextareaCounterExampleComponent,
  FormFieldExampleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormFieldModule,
    InputComponent,
    TextareaComponent,
    RadioModule,
    CheckboxComponent,
    CardModule,
    IconModule,
    SpinnerModule,
    ExampleConfigurationWrapperComponent,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FormFieldExamplesModule {}
