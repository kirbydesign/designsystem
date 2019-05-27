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
      description: '(Optional) Sets the message for the toast',
      defaultValue: 'null',
      inputValues: ['string'],
    },
    {
      name: 'position',
      description: '(Optional) Defines toasts position.',
      defaultValue: 'top',
      inputValues: ['top', 'bottom', 'middle'],
    },
    {
      name: 'duration',
      description:
        '(Optional) Duretion in milliseconds before the toast dismisses automatically. If cancelBtnText is set, duration will not be used.',
      defaultValue: '4000',
      inputValues: ['number'],
    },
    {
      name: 'cancelBtnText',
      description:
        '(Optional) The text that will appear on the cancel button. (only available for web)',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'themeColor',
      description: '(Optional) Sets which color the toast should use from the theme palette.',
      defaultValue: 'light',
      inputValues: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'light',
        'medium',
        'dark',
      ],
    },
  ];
}
