import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReactiveFormStateComponent } from './reactive-form-state.component';

const COMPONENT_DECLARATIONS = [ReactiveFormStateComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ReactiveFormStateExampleModule {}
