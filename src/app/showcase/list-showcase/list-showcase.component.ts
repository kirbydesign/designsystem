import { Component, OnInit } from '@angular/core';

import { ListDefaultExampleTemplate } from '../../examples/list/default/default';
import { ListBoldTextOnRowSelectionExampleTemplate } from '../../examples/list/bold-text-on-row-selection/bold-text-on-row-selection';
import { ListWithDividersExampleTemplate } from '~/app/examples/list/dividers/dividers';
import { ListSelectableItemsExampleTemplate } from '~/app/examples/list/selectable-items/selectable-items';
import { ListColoredItemsExampleTemplate } from '~/app/examples/list/colored-items/colored-items';
import { ListWithSectionsAndColoredItemsExampleTemplate } from '~/app/examples/list/sections-and-colored-items/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleTemplate } from '~/app/examples/list/header-and-footer/header-and-footer';
import { ListWithSectionsExampleTemplate } from '~/app/examples/list/sections/sections';
import { ListWithCustomContentExampleTemplate } from '~/app/examples/list/custom-content/custom-content';

declare var require: any;

@Component({
  selector: 'kirby-list-showcase',
  templateUrl: './list-showcase.component.html',
  styleUrls: ['./list-showcase.component.scss'],
})
export class ListShowcaseComponent implements OnInit {
  defaultTemplate: string = ListDefaultExampleTemplate;
  boldTextOnRowSelectionExampleTemplate: string = ListBoldTextOnRowSelectionExampleTemplate;
  dividersExampleTemplate: string = ListWithDividersExampleTemplate;
  selectableItemsExampleTemplate: string = ListSelectableItemsExampleTemplate;
  coloredItemsExampleTemplate: string = ListColoredItemsExampleTemplate;
  sectionsAndColoredItemsExampleTemplate: string = ListWithSectionsAndColoredItemsExampleTemplate;
  headerAndFooterExampleTemplate: string = ListWithHeaderAndFooterExampleTemplate;
  sectionsExampleTemplate: string = ListWithSectionsExampleTemplate;
  customContentExampleTemplate: string = ListWithCustomContentExampleTemplate;

  exampleHtml: string = require('!raw-loader!../../examples/list/list-example.component.html')
    .default;

  sectionHeaderExampleHtml: string =
    '<GridLayout *kirbyListSectionHeader="let section" ios:height="50">...</GridLayout>';
  constructor() {}

  ngOnInit() {}
}
