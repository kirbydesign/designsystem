import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { RadioButtonExampleComponent } from './radio-button-example.component';

const COMPONENT_DECLARATIONS = [RadioButtonExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class RadioButtonExampleModule {}
