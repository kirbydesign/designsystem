import { Component } from '@angular/core';
import { ApiDescriptionPropertiesComponent } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ListItemsNoDividersExampleComponent } from '~/app/examples/list-example/examples/items-no-dividers';
import { ListItemsExampleComponent } from '~/app/examples/list-example/examples/items';
import { ListWithHeaderAndFooterExampleComponent } from '~/app/examples/list-example/examples/header-and-footer';
import { ListWithSectionsExampleComponent } from '~/app/examples/list-example/examples/sections';
import { ListWithSectionsAndStandAloneExampleComponent } from '~/app/examples/list-example/examples/sections-with-standalone';
import { ListSelectableItemsExampleComponent } from '~/app/examples/list-example/examples/selectable-items';
import { ListWithStandAloneExampleComponent } from '~/app/examples/list-example/examples/stand-alone';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';
import { ExampleViewerComponent } from '~/app/shared/example-viewer/example-viewer.component';

@Component({
  selector: 'cookbook-list-showcase',
  templateUrl: './list-showcase.component.html',
  styleUrls: ['./list-showcase.component.scss'],
  imports: [
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
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
  listProperties: ApiDescriptionProperty[] = [
    {
      name: 'items',
      description: 'Items to render, in the order they should appear.',
      defaultValue: '[]',
      type: ['any[]'],
    },
    {
      name: 'getItemColor',
      description: 'Callback that returns the theme color for an item.',
      defaultValue: 'undefined',
      type: ['(item: any) => ThemeColor'],
    },
    {
      name: 'getSectionName',
      description: 'Callback to determine name of section. Sections will be ordered alphabetically',
      defaultValue: 'undefined',
      type: ['(item: any) => string'],
    },
    {
      name: 'trackBy',
      description:
        'Callback that defines how to track changes for items. When omitted, the item index is used.',
      defaultValue: 'undefined',
      type: ['TrackByFunction<any>'],
    },
    {
      name: 'getStandAloneByProperty',
      description:
        'Name of the boolean item property that determines if the item should stand alone.',
      defaultValue: 'undefined',
      type: ['string'],
    },
    {
      name: 'standAloneSpacing',
      description: 'Bottom margin for stand alone items',
      defaultValue: "'xxs'",
      type: ["'xxxxs' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'"],
    },
    {
      name: 'showDivider',
      description: 'Determines if dividers (bottom-border on list items) should be shown or not',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'markSelectedRow',
      description: 'Determines if selected list item text is bold.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'shape',
      description: 'Determines the outline shape of the list or its sections.',
      defaultValue: "'rounded'",
      type: ["'square' | 'rounded' | 'none'"],
    },
    {
      name: 'hasItemSpacing',
      description: 'Adds item spacing to the list.',
      defaultValue: 'undefined',
      type: ['boolean'],
    },
    {
      name: 'disableSelectionHighlight',
      description: 'Disables the bold highlight applied to the selected item.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'itemSelect',
      description: 'Emitted by kirby-list when a selectable list item is selected.',
      signature: 'EventEmitter<any>',
    },
  ];
}
