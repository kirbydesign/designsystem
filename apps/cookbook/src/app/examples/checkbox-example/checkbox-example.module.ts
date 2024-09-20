import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';

import { ReactiveFormStateExampleModule } from '../reactive-form-state/reactive-form.module';
import { ExampleConfigurationWrapperComponent } from '../example-configuration-wrapper/example-configuration-wrapper.component';
import { CheckboxConfirmExampleComponent } from './examples/confirm';
import { CheckboxDefaultExampleComponent } from './examples/default';
import { CheckboxEventsExampleComponent } from './examples/events';
import { CheckboxListExampleComponent } from './examples/list';
import { CheckboxMultilineExampleComponent } from './examples/multiline';
import { CheckboxSizesExampleComponent } from './examples/sizes';
import { CheckboxStatesExampleComponent } from './examples/states';
import { CheckboxReactiveFormsExampleComponent } from './examples/reactive-forms';
import { CheckboxExampleComponent } from './checkbox-example.component';

const COMPONENT_DECLARATIONS = [
  CheckboxExampleComponent,
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
    FormsModule,
    ExampleConfigurationWrapperComponent,
    ReactiveFormsModule,
    ReactiveFormStateExampleModule,
    CheckboxComponent,
    ItemModule,
    ListModule,
    DividerComponent,
  ],
  providers: [ToastController, ToastHelper],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class CheckboxExampleModule {}
