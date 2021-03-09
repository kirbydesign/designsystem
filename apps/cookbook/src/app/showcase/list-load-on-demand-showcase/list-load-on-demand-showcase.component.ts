import { Component } from '@angular/core';
import { ShowcaseEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-properties.component';

import { ListLoadOnDemandExampleTemplate } from './../../examples/list-load-on-demand-example/list-load-on-demand-example.component';

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

  events: ShowcaseEvent[] = [
    {
      name: 'loadOnDemand',
      description: `Emitted when the user has scrolled 80% of the list.`,
      signature: `KirbyListLoadMoreEvent { complete: (disableLoadMore?: boolean) => void; }`,
    },
  ];
}
