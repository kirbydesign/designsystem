import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ListBoldTextOnRowSelectionExampleComponent } from './components/bold-text-on-row-selection';
import { ListWithDividersExampleComponent } from './components/dividers';
import { ListSelectableItemsExampleComponent } from './components/selectable-items';
import { ListColoredItemsExampleComponent } from './components/colored-items';
import { ListWithSectionsAndColoredItemsExampleComponent } from './components/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleComponent } from './components/header-and-footer';
import { ListWithSectionsExampleComponent } from './components/sections';
import { ListItemsExampleComponent } from './components/items';

const listExamples = [
  ListBoldTextOnRowSelectionExampleComponent,
  ListWithDividersExampleComponent,
  ListSelectableItemsExampleComponent,
  ListColoredItemsExampleComponent,
  ListWithSectionsAndColoredItemsExampleComponent,
  ListWithHeaderAndFooterExampleComponent,
  ListWithSectionsExampleComponent,
  ListItemsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListExamplesModule {}
