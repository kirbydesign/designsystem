import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExamplesSharedModule } from '../examples.shared.module';
import { ExampleConfigurationWrapperReactiveFormsComponent } from './example-configuration-wrapper-reactive-forms.component';

const COMPONENT_DECLARATIONS = [ExampleConfigurationWrapperReactiveFormsComponent];

@NgModule({
  imports: [CommonModule, KirbyModule, FormsModule, ExamplesSharedModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ExampleConfigurationWrapperReactiveFormsExampleModule {}
