import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExpandableExampleSingleComponent } from './examples/single';
import { ExpandableExampleSeveralComponent } from './examples/several';
import { ExpandableExampleSingleCardComponent } from './examples/single-card';
import { ExpandableExampleSeveralCardComponent } from './examples/several-card';

const COMPONENT_DECLARATIONS = [
  ExpandableExampleSingleComponent,
  ExpandableExampleSeveralComponent,
  ExpandableExampleSingleCardComponent,
  ExpandableExampleSeveralCardComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ExpandableExampleModule {}
