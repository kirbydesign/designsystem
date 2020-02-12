import { Component, OnInit } from '@angular/core';

import { ListBoldTextOnRowSelectionExampleTemplate } from '../../examples/list/components/bold-text-on-row-selection';
import { ListWithDividersExampleTemplate } from '~/app/examples/list/components/dividers';
import { ListSelectableItemsExampleTemplate } from '~/app/examples/list/components/selectable-items';
import { ListColoredItemsExampleTemplate } from '~/app/examples/list/components/colored-items';
import { ListWithSectionsAndColoredItemsExampleTemplate } from '~/app/examples/list/components/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleTemplate } from '~/app/examples/list/components/header-and-footer';
import { ListWithSectionsExampleTemplate } from '~/app/examples/list/components/sections';
import { ListItemsExampleTemplate } from '../../examples/list/components/items';

declare var require: any;

@Component({
  selector: 'cookbook-list-showcase',
  templateUrl: './list-showcase.component.html',
  styleUrls: ['./list-showcase.component.scss'],
})
export class ListShowcaseComponent implements OnInit {
  boldTextOnRowSelectionExampleTemplate: string = ListBoldTextOnRowSelectionExampleTemplate;
  dividersExampleTemplate: string = ListWithDividersExampleTemplate;
  selectableItemsExampleTemplate: string = ListSelectableItemsExampleTemplate;
  coloredItemsExampleTemplate: string = ListColoredItemsExampleTemplate;
  sectionsAndColoredItemsExampleTemplate: string = ListWithSectionsAndColoredItemsExampleTemplate;
  headerAndFooterExampleTemplate: string = ListWithHeaderAndFooterExampleTemplate;
  sectionsExampleTemplate: string = ListWithSectionsExampleTemplate;
  items: string = ListItemsExampleTemplate;

  exampleHtml: string = require('!raw-loader!../../examples/list/list-example.component.html')
    .default;

  sectionHeaderExampleHtml: string =
    '<GridLayout *kirbyListSectionHeader="let section" ios:height="50">...</GridLayout>';
  constructor() {}

  ngOnInit() {}
}
