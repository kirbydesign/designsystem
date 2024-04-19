import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AccordionCardExampleComponent } from './examples/card';
import { AccordionDefaultExampleComponent } from './examples/default';
import { AccordionExpandedExampleComponent } from './examples/expanded';
import { AccordionEventsExampleComponent } from './examples/events';

const COMPONENT_DECLARATIONS = [
  AccordionCardExampleComponent,
  AccordionDefaultExampleComponent,
  AccordionExpandedExampleComponent,
  AccordionEventsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
