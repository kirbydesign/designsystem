import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { FormFieldModule } from '@kirbydesign/designsystem/form-field';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { ReactiveFormStateExampleModule } from '../reactive-form-state/reactive-form.module';

import { ExampleConfigurationWrapperComponent } from '../example-configuration-wrapper/example-configuration-wrapper.component';
import { RadioExampleBindingComponent } from './examples/binding';
import { RadioCustomContentExampleComponent } from './examples/custom';
import { RadioDefaultExampleComponent } from './examples/default';
import { RadioInFormFieldExampleComponent } from './examples/in-form-field';
import { RadioInItemExampleComponent } from './examples/in-item';
import { RadioMultilineExampleComponent } from './examples/multiline';
import { RadioReactiveFormsExampleComponent } from './examples/reactive-forms';
import { RadioSizesExampleComponent } from './examples/sizes';
import { RadioStatesExampleComponent } from './examples/states';
import { RadioTemplateDrivenFormsExampleComponent } from './examples/template-driven-forms';
import { RadioExampleComponent } from './radio-example.component';

const COMPONENT_DECLARATIONS = [
  RadioExampleComponent,
  RadioDefaultExampleComponent,
  RadioStatesExampleComponent,
  RadioSizesExampleComponent,
  RadioCustomContentExampleComponent,
  RadioInFormFieldExampleComponent,
  RadioInItemExampleComponent,
  RadioExampleBindingComponent,
  RadioReactiveFormsExampleComponent,
  RadioTemplateDrivenFormsExampleComponent,
  RadioMultilineExampleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ExampleConfigurationWrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormStateExampleModule,
    RadioModule,
    ItemModule,
    CardModule,
    FormFieldModule,
    ListModule,
    CheckboxComponent,
    ButtonComponent,
  ],
  providers: [ToastController, ToastHelper],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RadioExampleModule {}
