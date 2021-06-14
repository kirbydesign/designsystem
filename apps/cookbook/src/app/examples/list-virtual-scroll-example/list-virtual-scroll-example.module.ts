import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListVirtualScrollItemsExampleComponent } from './examples/items';
import { ListVirtualScrollSectionsExampleComponent } from './examples/sections';

const listExamples = [
  ListVirtualScrollSectionsExampleComponent,
  ListVirtualScrollItemsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListVirtualScrollExamplesModule {}
