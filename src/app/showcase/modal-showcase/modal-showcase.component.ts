import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-modal-showcase',
  templateUrl: './modal-showcase.component.html',
  preserveWhitespaces: true,
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
      description: 'The horizontal alignment of the title',
      defaultValue: 'center',
      inputValues: ['left', 'center'],
    },
    {
      name: 'closeIcon',
      description: 'The name of the icon that will appear on the default close modal button',
      defaultValue: 'close',
      inputValues: ['close', 'arrow'],
    },
    {
      name: 'dim',
      description:
        'The transparency of the background of the modal. 0 is fully transparent, while 1 is fully visible.',
      defaultValue: '0.5',
      inputValues: ['number (0..1)'],
    },
    {
      name: 'component',
      description: 'The component which will be rendered inside the modal.',
      defaultValue: '',
      inputValues: ['Component'],
    },
  ];
}
