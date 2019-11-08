import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ListDefaultExampleComponent } from '~/app/examples/list/default/default';
import { ListBoldTextOnRowSelectionExampleComponent } from '~/app/examples/list/bold-text-on-row-selection/bold-text-on-row-selection';
import { ListWithDividersExampleComponent } from '~/app/examples/list/dividers/dividers';
import { ListSelectableItemsExampleComponent } from '~/app/examples/list/selectable-items/selectable-items';
import { ListColoredItemsExampleComponent } from '~/app/examples/list/colored-items/colored-items';
import { ListWithSectionsAndColoredItemsExampleComponent } from '~/app/examples/list/sections-and-colored-items/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleComponent } from '~/app/examples/list/header-and-footer/header-and-footer';
import { ListWithSectionsExampleComponent } from '~/app/examples/list/sections/sections';
import { ListWithCustomContentExampleComponent } from '~/app/examples/list/custom-content/custom-content';

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
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListExamplesModule {}
