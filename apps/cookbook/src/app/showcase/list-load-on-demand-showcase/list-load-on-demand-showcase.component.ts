import { Component } from '@angular/core';

import { ListLoadOnDemandExampleTemplate } from './../../examples/list-load-on-demand-example/list-load-on-demand-example.component';
import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-list-load-on-demand-showcase',
  templateUrl: './list-load-on-demand-showcase.component.html',
  styleUrls: ['./list-load-on-demand-showcase.component.scss'],
})
export class ListLoadOnDemandShowcaseComponent {
  exampleHtml: string = ListLoadOnDemandExampleTemplate;

  properties: ShowcaseProperty[] = [
    {
      name: 'isLoadOnDemandEnabled',
      description: 'Determines if the loadOnDemand event should be emitted.',
      inputValues: ['boolean'],
      defaultValue: 'If there is a subscriber to the loadOnDemand event: true, otherwise false.',
    },
    {
      name: 'noMoreItemsText',
      description: 'Text to display when on demand loading of items is complete.',
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
