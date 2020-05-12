import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RadioButtonExampleComponent } from './radio-button-example.component';
import { ShowcaseModule } from '~/app/showcase/showcase.module';

const COMPONENT_DECLARATIONS = [RadioButtonExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule, ShowcaseModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DropdownExampleModule {}
