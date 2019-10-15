import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-toast-showcase',
  templateUrl: './toast-showcase.component.html',
})
export class ToastShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/toast-example/toast-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'message',
      description: 'Sets the message for the toast',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'messageType',
      description:
        'Message type defines which color the toast will have. There are three different toast types: success (green), warning (yellow), danger (red).',
      defaultValue: 'success',
      inputValues: ['success', 'warning', 'danger'],
    },
    {
      name: 'durationInMs',
      description: '(Optional) Duration in milliseconds before the toast dismisses automatically.',
      defaultValue: '4000',
      inputValues: ['number'],
    },
  ];
}
