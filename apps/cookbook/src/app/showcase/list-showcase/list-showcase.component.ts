import { Component, OnInit } from '@angular/core';
import { ListColoredItemsExampleTemplate } from '~/app/examples/list-example/examples/colored-items';
import { ListWithDividersExampleTemplate } from '~/app/examples/list-example/examples/dividers';
import { ListWithHeaderAndFooterExampleTemplate } from '~/app/examples/list-example/examples/header-and-footer';
import { ListWithSectionsExampleTemplate } from '~/app/examples/list-example/examples/sections';
import { ListWithSectionsAndColoredItemsExampleTemplate } from '~/app/examples/list-example/examples/sections-and-colored-items';
import { ListSelectableItemsExampleTemplate } from '~/app/examples/list-example/examples/selectable-items';
import { ListVirtualScrollItemsExampleTemplate } from '~/app/examples/list-example/examples/virtual-scroll';
import { ListVirtualScrollSectionsExampleTemplate } from '~/app/examples/list-example/examples/virtual-scroll-sections';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { ListBoldTextOnRowSelectionExampleTemplate } from '../../examples/list-example/examples/bold-text-on-row-selection';
import { ListItemsExampleTemplate } from '../../examples/list-example/examples/items';

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
  virtualScroll: string = ListVirtualScrollItemsExampleTemplate;
  virtualScrollSections: string = ListVirtualScrollSectionsExampleTemplate;

  exampleHtml: string = require('!raw-loader!../../examples/list-example/list-example.component.html')
    .default;

  sectionHeaderExampleHtml: string =
    '<GridLayout *kirbyListSectionHeader="let section" ios:height="50">...</GridLayout>';
  constructor() {}

  virtualScrollProperties: ApiDescriptionProperty[] = [
    {
      name: 'useVirtualScroll',
      description:
        'Determines if virtual scroll is used to improve rendering performance of many list items.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'virtualScrollViewportHeight',
      description:
        'When using virtual scroll, we need a fixed height scroll container. This property makes it possible to set a custom height on this.',
      type: ['number'],
      defaultValue: '500',
    },
    {
      name: 'virtualScrollSettings',
      description:
        'Sensible defaults are provided, but the behaviour of the virtual scroll can be fine tuned to specific needs. Available settings can also be seen at https://github.com/dhilt/ngx-ui-scroll#settings',
      type: ['VirtualScrollSettings'],
      defaultValue: '{ minIndex: 0, startIndex: 0, sizeStrategy: SizeStrategy.Frequent}',
    },
  ];

  ngOnInit() {}
}
