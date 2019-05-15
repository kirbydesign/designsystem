import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-alert-showcase',
  templateUrl: './alert-showcase.component.html',
  preserveWhitespaces: true,
})
export class AlertShowcaseComponent {
  exampleHtml: string = require('../../examples/alert-example/alert-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The title of the alert',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'message',
      description: '(Optional) The message shown under the title',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'okBtnText',
      description: 'The text that will appear on the ok button',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'cancelBtnText',
      description: '(Optional) The text that will appear on the cancel button',
      defaultValue: '',
      inputValues: ['string'],
    },
  ];
}
