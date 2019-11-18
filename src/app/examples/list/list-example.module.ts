import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ListDefaultExampleComponent } from '~/app/examples/list/components/default';
import { ListBoldTextOnRowSelectionExampleComponent } from '~/app/examples/list/components/bold-text-on-row-selection';
import { ListWithDividersExampleComponent } from '~/app/examples/list/components/dividers';
import { ListSelectableItemsExampleComponent } from '~/app/examples/list/components/selectable-items';
import { ListColoredItemsExampleComponent } from '~/app/examples/list/components/colored-items';
import { ListWithSectionsAndColoredItemsExampleComponent } from '~/app/examples/list/components/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleComponent } from '~/app/examples/list/components/header-and-footer';
import { ListWithSectionsExampleComponent } from '~/app/examples/list/components/sections';
import { ListWithCustomContentExampleComponent } from '~/app/examples/list/components/custom-content';
import { ListItemsExampleComponent } from '~/app/examples/list/components/items';

const listExamples = [
  ListDefaultExampleComponent,
  ListBoldTextOnRowSelectionExampleComponent,
  ListWithDividersExampleComponent,
  ListSelectableItemsExampleComponent,
  ListColoredItemsExampleComponent,
  ListWithSectionsAndColoredItemsExampleComponent,
  ListWithHeaderAndFooterExampleComponent,
  ListWithSectionsExampleComponent,
  ListWithCustomContentExampleComponent,
  ListItemsExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListExamplesModule {}
