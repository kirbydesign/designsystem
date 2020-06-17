import { Component, OnInit } from '@angular/core';

import { ListBoldTextOnRowSelectionExampleTemplate } from '../../examples/list/components/virtual-scroll/bold-text-on-row-selection';
import { ListWithDividersExampleTemplate } from '~/app/examples/list/components/virtual-scroll/dividers';
import { ListSelectableItemsExampleTemplate } from '~/app/examples/list/components/virtual-scroll/selectable-items';
import { ListColoredItemsExampleTemplate } from '~/app/examples/list/components/virtual-scroll/colored-items';
import { ListWithSectionsAndColoredItemsExampleTemplate } from '~/app/examples/list/components/virtual-scroll/sections-and-colored-items';
import { ListWithHeaderAndFooterExampleTemplate } from '~/app/examples/list/components/virtual-scroll/header-and-footer';
import { ListWithSectionsExampleTemplate } from '~/app/examples/list/components/virtual-scroll/sections';
import { ListItemsExampleTemplate } from '../../examples/list/components/virtual-scroll/items';

declare var require: any;

@Component({
  selector: 'cookbook-list-showcase',
  templateUrl: './list-virtual-scroll-showcase.component.html',
  styleUrls: ['./list-virtual-scroll-showcase.component.scss'],
})
export class ListVirtualScrollShowcaseComponent implements OnInit {
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
