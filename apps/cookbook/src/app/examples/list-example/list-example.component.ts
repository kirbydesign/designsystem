import { Component } from '@angular/core';
import { ListWithHeaderAndFooterExampleComponent } from './examples/header-and-footer';
import { ListItemsNoDividersExampleComponent } from './examples/items-no-dividers';
import { ListItemsExampleComponent } from './examples/items';
import { ListWithSectionsAndStandAloneExampleComponent } from './examples/sections-with-standalone';
import { ListWithSectionsExampleComponent } from './examples/sections';
import { ListSelectableItemsExampleComponent } from './examples/selectable-items';
import { ListWithStandAloneExampleComponent } from './examples/stand-alone';

@Component({
  selector: 'cookbook-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
  imports: [
    ListWithHeaderAndFooterExampleComponent,
    ListItemsNoDividersExampleComponent,
    ListItemsExampleComponent,
    ListWithSectionsAndStandAloneExampleComponent,
    ListWithSectionsExampleComponent,
    ListSelectableItemsExampleComponent,
    ListWithStandAloneExampleComponent,
  ],
})
export class ListExampleComponent {}
