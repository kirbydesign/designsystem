import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-modal-showcase',
  templateUrl: './modal-showcase.component.html',
})
export class ModalShowcaseComponent {
  exampleHtml: string = require('../../examples/modal-example/modal-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The header of the modal',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'titleHorizontalAlignment',
      description: 'Indicates the title horizontal alignment',
      defaultValue: 'center',
      inputValues: ['left', 'center'],
    },
    {
      name: 'closeIcon',
      description: 'The icon that will appear on the default close modal button',
      defaultValue: 'close',
      inputValues: ['close', 'arrow'],
    },
    {
      name: 'dim',
      description: 'Decides the dimness of the background once the modal is open',
      defaultValue: '0.5',
      inputValues: ['number (0..1)'],
    },
    {
      name: 'component',
      description:
        'The nested component class which will be rendered inside the modal. It is recommended that your nested components implement the EmbeddedModal interface',
      defaultValue: '',
      inputValues: ['Component'],
    },
  ];
}
