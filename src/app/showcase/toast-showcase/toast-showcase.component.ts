import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-toast-showcase',
  templateUrl: './toast-showcase.component.html',
})
export class ToastShowcaseComponent {
  exampleHtml: string = require('../../examples/toast-example/toast-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'message',
      description: 'Sets the message for the toast',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'messageType',
      description: '(Optional) Sets which message type the toast should have.',
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
