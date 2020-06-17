import { ListExampleComponent } from './list-example.component';
import { ListBoldTextOnRowSelectionExampleComponent } from './components/bold-text-on-row-selection';
import { ListWithDividersExampleComponent } from './components/dividers';
import { ListSelectableItemsExampleComponent } from './components/selectable-items';
import { ListColoredItemsExampleComponent } from './components/colored-items';
import { ListWithSectionsAndColoredItemsExampleComponent } from './components/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleComponent } from './components/header-and-footer';
import { ListWithSectionsExampleComponent } from './components/sections';
import { ListItemsExampleComponent } from './components/items';
import { ListLoadOnDemandExampleComponent } from './components/load-on-demand/list-load-on-demand-example.component';

export const listRoutes = {
  path: 'list',
  component: ListExampleComponent,
  children: [
    {
      path: '',
      redirectTo: 'with-items',
    },
    {
      path: 'bold-text-on-row-selection',
      component: ListBoldTextOnRowSelectionExampleComponent,
    },
    {
      path: 'with-dividers',
      component: ListWithDividersExampleComponent,
    },
    {
      path: 'with-selectable-items',
      component: ListSelectableItemsExampleComponent,
    },
    {
      path: 'with-colored-items',
      component: ListColoredItemsExampleComponent,
    },
    {
      path: 'with-sections-and-colored-items',
      component: ListWithSectionsAndColoredItemsExampleComponent,
    },
    {
      path: 'with-header-and-footer',
      component: ListWithHeaderAndFooterExampleComponent,
    },
    {
      path: 'with-sections',
      component: ListWithSectionsExampleComponent,
    },
    {
      path: 'with-items',
      component: ListItemsExampleComponent,
    },
  ],
};
