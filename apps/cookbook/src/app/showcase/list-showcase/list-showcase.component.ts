import { Component } from '@angular/core';
import { ListItemsExampleTemplate } from '../../examples/list-example/examples/items';
import exampleHtml from '../../examples/list-example/list-example.component.html?raw';
import { ListColoredItemsExampleTemplate } from '~/app/examples/list-example/examples/colored-items';
import { ListWithDividersExampleTemplate } from '~/app/examples/list-example/examples/dividers';
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
})
export class ListShowcaseComponent {
  dividersExampleTemplate: string = ListWithDividersExampleTemplate;
  selectableItemsExampleTemplate: string = ListSelectableItemsExampleTemplate;
  coloredItemsExampleTemplate: string = ListColoredItemsExampleTemplate;
  sectionsAndColoredItemsExampleTemplate: string = ListWithSectionsAndColoredItemsExampleTemplate;
  headerAndFooterExampleTemplate: string = ListWithHeaderAndFooterExampleTemplate;
  sectionsExampleTemplate: string = ListWithSectionsExampleTemplate;
  standAloneExampleTemplate: string = ListWithStandAloneExampleTemplate;
  sectionsAndStandAloneExampleTemplate: string = ListWithSectionsAndStandAloneExampleTemplate;
  items: string = ListItemsExampleTemplate;

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
      description: 'Will give every other item in the list a ThemeColor',
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
      description: 'Property name to decide which items should be stand alone',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'standAloneSpacing',
      description: 'Bottom margin for stand alone items',
      defaultValue: 'null',
      type: ['string'],
    },
  ];
}
