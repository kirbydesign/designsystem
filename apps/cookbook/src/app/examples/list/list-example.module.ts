import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListBoldTextOnRowSelectionExampleComponent } from './components/bold-text-on-row-selection';
import { ListColoredItemsExampleComponent } from './components/colored-items';
import { ListWithDividersExampleComponent } from './components/dividers';
import { ListWithHeaderAndFooterExampleComponent } from './components/header-and-footer';
import { ListItemsExampleComponent } from './components/items';
import { ListWithSectionsExampleComponent } from './components/sections';
import { ListWithSectionsAndColoredItemsExampleComponent } from './components/sections-and-colored-items';
import { ListSelectableItemsExampleComponent } from './components/selectable-items';

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
