import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ExamplesSharedModule } from '../examples.shared.module';
import { ToggleButtonExampleComponent } from './toggle-button-example.component';
import { ToggleButtonDefaultExampleComponent } from './examples/default';
import { ToggleButtonReactiveFormsExampleComponent } from './examples/reactive-forms';

const DECLARATIONS = [
  ToggleButtonExampleComponent,
  ToggleButtonDefaultExampleComponent,
  ToggleButtonReactiveFormsExampleComponent,
];

@NgModule({
  imports: [KirbyModule, CommonModule, ExamplesSharedModule, FormsModule, ReactiveFormsModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class ToggleButtonExampleModule {}
