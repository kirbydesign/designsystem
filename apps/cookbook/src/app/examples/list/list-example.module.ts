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
import { ListVirtualScrollBoldTextOnRowSelectionExampleComponent } from './components/virtual-scroll/bold-text-on-row-selection';
import { ListVirtualScrollColoredItemsExampleComponent } from './components/virtual-scroll/colored-items';
import { ListVirtualScrollWithDividersExampleComponent } from './components/virtual-scroll/dividers';
import { ListVirtualScrollWithHeaderAndFooterExampleComponent } from './components/virtual-scroll/header-and-footer';
import { ListVirtualScrollItemsExampleComponent } from './components/virtual-scroll/items';
import { ListVirtualScrollWithSectionsExampleComponent } from './components/virtual-scroll/sections';
import { ListVirtualScrollWithSectionsAndColoredItemsExampleComponent } from './components/virtual-scroll/sections-and-colored-items';
import { ListVirtualScrollSelectableItemsExampleComponent } from './components/virtual-scroll/selectable-items';
import { ListLoadOnDemandExampleComponent } from './components/virtual-scroll/list-load-on-demand';

const declarations = [
  ListBoldTextOnRowSelectionExampleComponent,
  ListWithDividersExampleComponent,
  ListSelectableItemsExampleComponent,
  ListColoredItemsExampleComponent,
  ListWithSectionsAndColoredItemsExampleComponent,
  ListWithHeaderAndFooterExampleComponent,
  ListWithSectionsExampleComponent,
  ListItemsExampleComponent,
  ListVirtualScrollBoldTextOnRowSelectionExampleComponent,
  ListVirtualScrollColoredItemsExampleComponent,
  ListVirtualScrollWithDividersExampleComponent,
  ListVirtualScrollWithHeaderAndFooterExampleComponent,
  ListVirtualScrollItemsExampleComponent,
  ListVirtualScrollWithSectionsExampleComponent,
  ListVirtualScrollWithSectionsAndColoredItemsExampleComponent,
  ListVirtualScrollSelectableItemsExampleComponent,
  ListLoadOnDemandExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ListExamplesModule {}
