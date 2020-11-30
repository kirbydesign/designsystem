import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AccordionExampleComponent } from './examples/accordion';
import { AccordionExampleCardComponent } from './examples/accordion-card';

const COMPONENT_DECLARATIONS = [AccordionExampleComponent, AccordionExampleCardComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
