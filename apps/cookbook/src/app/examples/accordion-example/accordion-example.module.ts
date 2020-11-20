import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AccordionExampleSingleComponent } from './examples/single';
import { AccordionExampleSeveralComponent } from './examples/several';
import { AccordionExampleSingleCardComponent } from './examples/single-card';
import { AccordionExampleSeveralCardComponent } from './examples/several-card';

const COMPONENT_DECLARATIONS = [
  AccordionExampleSingleComponent,
  AccordionExampleSeveralComponent,
  AccordionExampleSingleCardComponent,
  AccordionExampleSeveralCardComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AccordionExampleModule {}
