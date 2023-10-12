import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExampleConfigurationWrapperReactiveFormsExampleModule } from '../example-configuration-wrapper-reactive-forms/example-configuration-wrapper-reactive-forms.module';
import { ExamplesSharedModule } from '../examples.shared.module';
import { CheckboxConfirmExampleComponent } from './examples/confirm';
import { CheckboxDefaultExampleComponent } from './examples/default';
import { CheckboxEventsExampleComponent } from './examples/events';
import { CheckboxListExampleComponent } from './examples/list';
import { CheckboxMultilineExampleComponent } from './examples/multiline';
import { CheckboxSizesExampleComponent } from './examples/sizes';
import { CheckboxStatesExampleComponent } from './examples/states';
import { CheckboxReactiveFormsExampleComponent } from './examples/reactive-forms';

const COMPONENT_DECLARATIONS = [
  CheckboxDefaultExampleComponent,
  CheckboxListExampleComponent,
  CheckboxConfirmExampleComponent,
  CheckboxStatesExampleComponent,
  CheckboxSizesExampleComponent,
  CheckboxEventsExampleComponent,
  CheckboxMultilineExampleComponent,
  CheckboxReactiveFormsExampleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    KirbyModule,
    FormsModule,
    ExamplesSharedModule,
    ReactiveFormsModule,
    ExampleConfigurationWrapperReactiveFormsExampleModule,
  ],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class CheckboxExampleModule {}
