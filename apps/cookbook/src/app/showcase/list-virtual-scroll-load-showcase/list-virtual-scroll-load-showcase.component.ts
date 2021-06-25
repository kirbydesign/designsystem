import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
declare var require: any;

@Component({
  selector: 'cookbook-virtual-scroll-load-showcase',
  templateUrl: './list-virtual-scroll-load-showcase.component.html',
  styleUrls: ['./list-virtual-scroll-load-showcase.component.scss'],
})
export class ListVirtualScrollLoadShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/list-virtual-scroll-load-example/list-virtual-scroll-load-example.component.html')
    .default;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'useVirtualScroll',
      description:
        'Determines if virtual scroll is used to improve rendering performance of many list items.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'virtualScrollTimeout',
      description:
        'When combining virtual scroll with load-on-demand, a timeout is defined as a failsafe for a non-responsive external API. This can be increased if working with slow APIs or large queries.',
      type: ['number'],
      defaultValue: '5000',
    },
    {
      name: 'isLoadOnDemandEnabled',
      description: 'Determines if the loadOnDemand event should be emitted.',
      type: ['boolean'],
      defaultValue: 'If there is a subscriber to the loadOnDemand event: true, otherwise false.',
    },
    {
      name: 'noMoreItemsText',
      description: 'Text to display when on demand loading of items is complete.',
      type: ['string'],
      defaultValue: 'undefined',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'loadOnDemand',
      description: `Emitted when the user has scrolled to the end of the list.`,
      signature: `KirbyListLoadMoreEvent { complete: (disableLoadMore?: boolean) => void; }`,
    },
  ];
}
