import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AccordionCardExampleComponent } from './examples/accordion-card';
import { AccordionExampleComponent } from './examples/accordion';
import { AccordionExpandedExampleComponent } from './examples/accordion-expanded';

const COMPONENT_DECLARATIONS = [
  AccordionCardExampleComponent,
  AccordionExampleComponent,
  AccordionExpandedExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
