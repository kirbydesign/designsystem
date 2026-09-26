import { Component } from '@angular/core';
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../examples/list-example/list-example.component.html' with {
  loader: 'text',
};
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { IphoneComponent } from '../../iphone/iphone.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ListItemsNoDividersExampleComponent } from '../../examples/list-example/examples/items-no-dividers';
import { ListItemsExampleComponent } from '~/app/examples/list-example/examples/items';
import { ListWithHeaderAndFooterExampleComponent } from '~/app/examples/list-example/examples/header-and-footer';
import { ListWithSectionsExampleComponent } from '~/app/examples/list-example/examples/sections';
import { ListWithSectionsAndStandAloneExampleComponent } from '~/app/examples/list-example/examples/sections-with-standalone';
import { ListSelectableItemsExampleComponent } from '~/app/examples/list-example/examples/selectable-items';
import { ListWithStandAloneExampleComponent } from '~/app/examples/list-example/examples/stand-alone';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';
import { ExampleViewerComponent } from '~/app/shared/example-viewer/example-viewer.component';

@Component({
  selector: 'cookbook-list-showcase',
  templateUrl: './list-showcase.component.html',
  styleUrls: ['./list-showcase.component.scss'],
  imports: [
    ApiDescriptionPropertiesComponent,
    ImportViewerComponent,
    ExampleViewerComponent,
    ListItemsExampleComponent,
    ListItemsNoDividersExampleComponent,
    ListWithHeaderAndFooterExampleComponent,
    ListWithSectionsExampleComponent,
    ListWithStandAloneExampleComponent,
    ListWithSectionsAndStandAloneExampleComponent,
    ListSelectableItemsExampleComponent,
  ],
})
export class ListShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'showDivider',
      description: 'Determines if dividers (bottom-border on list items) should be shown or not',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'itemSelect',
      description: 'Emitting event when an item is selected',
      defaultValue: 'null',
      type: ['any'],
    },
    {
      name: 'getSectionName',
      description: 'Callback to determine name of section. Sections will be ordered alphabetically',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'getStandAloneByProperty',
      description: 'A boolean property on the item that decides if the item should stand alone',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'standAloneSpacing',
      description: 'Bottom margin for stand alone items',
      defaultValue: 'null',
      type: ["'xxxxs' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'"],
    },
  ];
}
