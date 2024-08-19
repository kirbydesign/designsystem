import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { FormFieldModule } from '@kirbydesign/designsystem/form-field';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ExamplesSharedModule } from '../examples.shared.module';
import { ReactiveFormStateExampleModule } from '../reactive-form-state/reactive-form.module';

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
import { RadioExampleBindingComponent } from './examples/binding';

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
    ExamplesSharedModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormStateExampleModule,
    RadioModule,
    ItemModule,
    CardModule,
    FormFieldModule,
    CheckboxComponent,
    ButtonComponent,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RadioExampleModule {}
