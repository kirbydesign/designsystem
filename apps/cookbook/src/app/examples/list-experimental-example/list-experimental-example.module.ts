import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListExperimentalItemsExampleComponent } from './examples/item';
import { ListExperimentalSlidingItemsExampleComponent } from './examples/item-sliding';

const listExperimentalExamples = [
  ListExperimentalItemsExampleComponent,
  ListExperimentalSlidingItemsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ScrollingModule],
  declarations: [...listExperimentalExamples],
  exports: [...listExperimentalExamples],
})
export class ListExperimentalExampleModule {}
