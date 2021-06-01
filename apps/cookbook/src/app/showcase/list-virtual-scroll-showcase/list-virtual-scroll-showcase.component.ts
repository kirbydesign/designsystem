import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { ListVirtualScrollItemsExampleTemplate } from './../../examples/list-virtual-scroll-example/examples/items';
import { ListVirtualScrollLoadExampleTemplate } from './../../examples/list-virtual-scroll-example/examples/load-on-demand';
import { ListVirtualScrollSectionsExampleTemplate } from './../../examples/list-virtual-scroll-example/examples/sections';

@Component({
  selector: 'cookbook-virtual-scroll-showcase',
  templateUrl: './list-virtual-scroll-showcase.component.html',
  styleUrls: ['./list-virtual-scroll-showcase.component.scss'],
})
export class ListVirtualScrollShowcaseComponent {
  itemsHtml: string = ListVirtualScrollItemsExampleTemplate;
  loadOnDemandHtml: string = ListVirtualScrollLoadExampleTemplate;
  sectionsHtml: string = ListVirtualScrollSectionsExampleTemplate;

  properties: ApiDescriptionProperty[] = [
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
      name: 'virtualScrollTimeout',
      description:
        'When combining virtual scroll with load-on-demand, a timeout is defined as a failsafe for a non-responsive external API. This can be increased if working with slow APIs or large queries.',
      type: ['number'],
      defaultValue: '5000',
    },
    {
      name: 'virtualScrollSettings',
      description:
        'Sensible defaults are provided, but the behaviour of the virtual scroll can be fine tuned to specific needs. Available settings can also be seen at https://github.com/dhilt/ngx-ui-scroll#settings',
      type: ['VirtualScrollerSettings'],
      defaultValue: '{ minIndex: 0, startIndex: 0, bufferSize: 10}',
    },
  ];
}
