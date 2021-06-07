import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListVirtualScrollItemsExampleComponent } from './examples/items';
import { ListVirtualScrollLoadExampleComponent } from './examples/load-on-demand';
import { ListVirtualScrollSectionsExampleComponent } from './examples/sections';

const listExamples = [
  ListVirtualScrollSectionsExampleComponent,
  ListVirtualScrollItemsExampleComponent,
  ListVirtualScrollLoadExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListVirtualScrollExamplesModule {}
