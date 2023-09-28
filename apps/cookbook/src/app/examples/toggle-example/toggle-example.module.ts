import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ExamplesSharedModule } from '../examples.shared.module';
import { ToggleExampleComponent } from './toggle-example.component';
import { ToggleDefaultExampleComponent } from './examples/default';
import { ToggleReactiveFormsExampleComponent } from './examples/reactive-forms';

const DECLARATIONS = [
  ToggleExampleComponent,
  ToggleDefaultExampleComponent,
  ToggleReactiveFormsExampleComponent,
];

@NgModule({
  imports: [KirbyModule, CommonModule, ExamplesSharedModule, FormsModule, ReactiveFormsModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class ToggleExampleModule {}
