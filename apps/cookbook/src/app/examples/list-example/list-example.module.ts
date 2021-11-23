import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListBoldTextOnRowSelectionExampleComponent } from './examples/bold-text-on-row-selection';
import { ListColoredItemsExampleComponent } from './examples/colored-items';
import { ListWithDividersExampleComponent } from './examples/dividers';
import { ListWithHeaderAndFooterExampleComponent } from './examples/header-and-footer';
import { ListItemsExampleComponent } from './examples/items';
import { ListVirtualScrollExampleComponent } from './examples/list-with-virtual-scroll';
import { ListWithSectionsExampleComponent } from './examples/sections';
import { ListWithSectionsAndColoredItemsExampleComponent } from './examples/sections-and-colored-items';
import { ListSelectableItemsExampleComponent } from './examples/selectable-items';

const listExamples = [
  ListBoldTextOnRowSelectionExampleComponent,
  ListWithDividersExampleComponent,
  ListSelectableItemsExampleComponent,
  ListColoredItemsExampleComponent,
  ListWithSectionsAndColoredItemsExampleComponent,
  ListWithHeaderAndFooterExampleComponent,
  ListWithSectionsExampleComponent,
  ListItemsExampleComponent,
  ListVirtualScrollExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ScrollingModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListExamplesModule {}
