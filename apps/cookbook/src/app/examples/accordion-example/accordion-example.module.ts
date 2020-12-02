import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AccordionCardExampleComponent } from './examples/card';
import { AccordionDefaultExampleComponent } from './examples/default';
import { AccordionExpandedExampleComponent } from './examples/expanded';

const COMPONENT_DECLARATIONS = [
  AccordionCardExampleComponent,
  AccordionDefaultExampleComponent,
  AccordionExpandedExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
