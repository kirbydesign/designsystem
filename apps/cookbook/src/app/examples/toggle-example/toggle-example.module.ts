import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ReactiveFormStateExampleModule } from '../reactive-form-state/reactive-form.module';
import { ExampleConfigurationWrapperComponent } from '../example-configuration-wrapper/example-configuration-wrapper.component';
import { ToggleExampleComponent } from './toggle-example.component';
import { ToggleDefaultExampleComponent } from './examples/default';
import { ToggleReactiveFormsExampleComponent } from './examples/reactive-forms';

const DECLARATIONS = [
  ToggleExampleComponent,
  ToggleDefaultExampleComponent,
  ToggleReactiveFormsExampleComponent,
];

@NgModule({
  imports: [
    KirbyModule,
    CommonModule,
    ExampleConfigurationWrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormStateExampleModule,
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class ToggleExampleModule {}
