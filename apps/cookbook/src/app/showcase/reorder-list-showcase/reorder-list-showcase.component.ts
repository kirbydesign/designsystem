import { Component } from '@angular/core';
import { ShowcaseMethod } from '~/app/shared/showcase-methods/showcase-methods.component';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-properties.component';

declare var require: any;

@Component({
  selector: 'cookbook-reorder-showcase',
  templateUrl: './reorder-list-showcase.component.html',
  styleUrls: ['./reorder-list-showcase.component.scss'],
})
export class ReorderListShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/reorder-list-example/reorder-list-example.component.html')
    .default;

  properties: ShowcaseProperty[] = [
    {
      name: 'items',
      description: 'Array of items',
      defaultValue: '[ ]',
      inputValues: ['Array<any>'],
    },
    {
      name: 'subItemsName',
      description: 'Name of the sub items array',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'getItemTextDefault',
      description: 'Function to retrieve text for defaultTemplate',
      defaultValue: undefined,
      inputValues: ['function(item: any)'],
    },
  ];

  events: ShowcaseProperty[] = [
    {
      name: 'itemReorder',
      description:
        'Event that needs to be listened to in order to complete the reorder action. Once the event has been emitted, the `complete()` method then needs to be called in order to finalize the reorder action.',
    },
    {
      name: 'subItemReorder',
      description:
        'Event that needs to be listened to in order to complete the subitems reorder action. Once the event has been emitted, the `complete()` method then needs to be called in order to finalize the subitems reorder action. Event.details.parentElement holds the parent element for the list being sorted.',
    },
  ];

  methods: ShowcaseMethod[] = [
    {
      name: 'complete()',
      description:
        'Completes the reorder operation. Must be called by the (itemReorder | subItemReorder) event. If a list of items is passed, the list will be reordered and returned in the proper order. If no parameters are passed or if true is passed in, the reorder will complete and the item will remain in the position it was dragged to. If an empty object is passed, the reorder will complete and the item will bounce back to its original position.',
      signature: 'complete(listOrReorder?: any | any[] | undefined) => Promise<any>',
    },
  ];
}
