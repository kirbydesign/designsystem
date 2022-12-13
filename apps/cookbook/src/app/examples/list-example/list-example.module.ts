import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ListColoredItemsExampleComponent } from './examples/colored-items';
import { ListItemsExampleComponent } from './examples/dividers';
import { ListWithHeaderAndFooterExampleComponent } from './examples/header-and-footer';
import { ListItemsNoDividersExampleComponent } from './examples/items';
import { ListWithSectionsExampleComponent } from './examples/sections';
import { ListWithSectionsAndColoredItemsExampleComponent } from './examples/sections-and-colored-items';
import { ListWithSectionsAndStandAloneExampleComponent } from './examples/sections-with-standalone';
import { ListSelectableItemsExampleComponent } from './examples/selectable-items';
import { ListWithStandAloneExampleComponent } from './examples/stand-alone';

const listExamples = [
  ListItemsExampleComponent,
  ListSelectableItemsExampleComponent,
  ListColoredItemsExampleComponent,
  ListWithSectionsAndColoredItemsExampleComponent,
  ListWithHeaderAndFooterExampleComponent,
  ListWithSectionsExampleComponent,
  ListItemsNoDividersExampleComponent,
  ListWithStandAloneExampleComponent,
  ListWithSectionsAndStandAloneExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ScrollingModule],
  declarations: [...listExamples],
  exports: [...listExamples],
})
export class ListExamplesModule {}
