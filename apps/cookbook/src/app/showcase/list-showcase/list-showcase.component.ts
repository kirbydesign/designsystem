import { Component } from '@angular/core';
import { ListItemsNoDividersExampleTemplate } from '../../examples/list-example/examples/items-no-dividers';
import exampleHtml from '../../examples/list-example/list-example.component.html?raw';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { IphoneComponent } from '../../iphone/iphone.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ListColoredItemsExampleTemplate } from '~/app/examples/list-example/examples/colored-items';
import { ListItemsExampleTemplate } from '~/app/examples/list-example/examples/items';
import { ListWithHeaderAndFooterExampleTemplate } from '~/app/examples/list-example/examples/header-and-footer';
import { ListWithSectionsExampleTemplate } from '~/app/examples/list-example/examples/sections';
import { ListWithSectionsAndColoredItemsExampleTemplate } from '~/app/examples/list-example/examples/sections-and-colored-items';
import { ListWithSectionsAndStandAloneExampleTemplate } from '~/app/examples/list-example/examples/sections-with-standalone';
import { ListSelectableItemsExampleTemplate } from '~/app/examples/list-example/examples/selectable-items';
import { ListWithStandAloneExampleTemplate } from '~/app/examples/list-example/examples/stand-alone';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-list-showcase',
  templateUrl: './list-showcase.component.html',
  styleUrls: ['./list-showcase.component.scss'],
  imports: [CodeViewerComponent, IphoneComponent, ApiDescriptionPropertiesComponent],
})
export class ListShowcaseComponent {
  items: string = ListItemsExampleTemplate;
  selectableItemsExampleTemplate: string = ListSelectableItemsExampleTemplate;
  coloredItemsExampleTemplate: string = ListColoredItemsExampleTemplate;
  sectionsAndColoredItemsExampleTemplate: string = ListWithSectionsAndColoredItemsExampleTemplate;
  headerAndFooterExampleTemplate: string = ListWithHeaderAndFooterExampleTemplate;
  sectionsExampleTemplate: string = ListWithSectionsExampleTemplate;
  standAloneExampleTemplate: string = ListWithStandAloneExampleTemplate;
  sectionsAndStandAloneExampleTemplate: string = ListWithSectionsAndStandAloneExampleTemplate;
  noDividersExampleTemplate: string = ListItemsNoDividersExampleTemplate;

  exampleHtml = exampleHtml;

  sectionHeaderExampleHtml: string =
    '<GridLayout *kirbyListSectionHeader="let section" ios:height="50">...</GridLayout>';
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
      name: 'getItemColor',
      description:
        ' Callback used by each item in the list. Should return a ThemeColor which will become the background color of that item',
      defaultValue: 'null',
      type: ['ThemeColor'],
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
