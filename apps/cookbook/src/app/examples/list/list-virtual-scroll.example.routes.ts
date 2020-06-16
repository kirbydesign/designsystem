import { ListExampleComponent } from './list-example.component';
import { ListVirtualScrollBoldTextOnRowSelectionExampleComponent } from './components/virtual-scroll/bold-text-on-row-selection';
import { ListVirtualScrollWithDividersExampleComponent } from './components/virtual-scroll/dividers';
import { ListVirtualScrollSelectableItemsExampleComponent } from './components/virtual-scroll/selectable-items';
import { ListVirtualScrollColoredItemsExampleComponent } from './components/virtual-scroll/colored-items';
import { ListVirtualScrollWithSectionsAndColoredItemsExampleComponent } from './components/virtual-scroll/sections-and-colored-items';
import { ListVirtualScrollWithHeaderAndFooterExampleComponent } from './components/virtual-scroll/header-and-footer';
import { ListVirtualScrollWithSectionsExampleComponent } from './components/virtual-scroll/sections';
import { ListVirtualScrollItemsExampleComponent } from './components/virtual-scroll/items';
import { ListLoadOnDemandExampleComponent } from './components/virtual-scroll/list-load-on-demand';

export const listVirtualScrollRoutes = {
  path: 'list-virtual-scroll',
  component: ListExampleComponent,
  children: [
    {
      path: '',
      redirectTo: 'with-items',
    },
    {
      path: 'bold-text-on-row-selection',
      component: ListVirtualScrollBoldTextOnRowSelectionExampleComponent,
    },
    {
      path: 'with-dividers',
      component: ListVirtualScrollWithDividersExampleComponent,
    },
    {
      path: 'with-selectable-items',
      component: ListVirtualScrollSelectableItemsExampleComponent,
    },
    {
      path: 'with-colored-items',
      component: ListVirtualScrollColoredItemsExampleComponent,
    },
    {
      path: 'with-sections-and-colored-items',
      component: ListVirtualScrollWithSectionsAndColoredItemsExampleComponent,
    },
    {
      path: 'with-header-and-footer',
      component: ListVirtualScrollWithHeaderAndFooterExampleComponent,
    },
    {
      path: 'with-sections',
      component: ListVirtualScrollWithSectionsExampleComponent,
    },
    {
      path: 'with-items',
      component: ListVirtualScrollItemsExampleComponent,
    },
    {
      path: 'list-load-on-demand',
      component: ListLoadOnDemandExampleComponent,
    },
  ],
};
