import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RadioButtonExampleComponent } from './radio-button-example.component';
import { RadioButtonExampleBindingComponent } from './examples/binding';
import { RadioButtonExampleTemplateDrivenFormsComponent } from './examples/template-driven-forms';
import { RadioButtonExampleReactiveFormsComponent } from './examples/reactive-forms';

const COMPONENT_DECLARATIONS = [
  RadioButtonExampleComponent,
  RadioButtonExampleBindingComponent,
  RadioButtonExampleTemplateDrivenFormsComponent,
  RadioButtonExampleReactiveFormsComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RadioButtonExampleModule {}
