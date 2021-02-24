import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'cookbook-list-load-on-demand-showcase',
  templateUrl: './list-load-on-demand-showcase.component.html',
  styleUrls: ['./list-load-on-demand-showcase.component.scss'],
})
export class ListLoadOnDemandShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/list/components/load-on-demand/list-load-on-demand-example.component.html')
    .default;

  properties: ShowcaseProperty[] = [
    {
      name: 'isLoadOnDemandEnabled',
      description: 'Determines if the loadOnDemand event should be emitted.',
      inputValues: ['boolean'],
      defaultValue: 'If there is a subscriber to the loadOnDemand event: true, otherwise false.',
    },
    {
      name: 'noMoreItemsText',
      description:
        'Text to display when no more items can be loaded (used for "on demand"-loading).',
      inputValues: ['string'],
      defaultValue: 'undefined',
    },
  ];

  events: ShowcaseProperty[] = [
    {
      name: 'loadOnDemand',
      description: `Emitted when the user has scrolled 80% of the list.`,
      inputValues: [`KirbyListLoadMoreEvent { complete: (disableLoadMore?: boolean) => void; }`],
    },
  ];

  eventsColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
