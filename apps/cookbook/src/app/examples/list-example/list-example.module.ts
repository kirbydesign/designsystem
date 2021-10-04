import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListBoldTextOnRowSelectionExampleComponent } from './examples/bold-text-on-row-selection';
import { ListColoredItemsExampleComponent } from './examples/colored-items';
import { ListWithDividersExampleComponent } from './examples/dividers';
import { ListWithHeaderAndFooterExampleComponent } from './examples/header-and-footer';
import { ListItemsExampleComponent } from './examples/items';
import { ListWithSectionsExampleComponent } from './examples/sections';
import { ListWithSectionsAndColoredItemsExampleComponent } from './examples/sections-and-colored-items';
import { ListSelectableItemsExampleComponent } from './examples/selectable-items';
import { ListVirtualScrollItemsExampleComponent } from './examples/virtual-scroll';
import { ListVirtualScrollSectionsExampleComponent } from './examples/virtual-scroll-sections';

const listExamples = [
  ListBoldTextOnRowSelectionExampleComponent,
  ListWithDividersExampleComponent,
  ListSelectableItemsExampleComponent,
  ListColoredItemsExampleComponent,
  ListWithSectionsAndColoredItemsExampleComponent,
  ListWithHeaderAndFooterExampleComponent,
  ListWithSectionsExampleComponent,
  ListItemsExampleComponent,
  ListVirtualScrollItemsExampleComponent,
  ListVirtualScrollSectionsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListExamplesModule {}
