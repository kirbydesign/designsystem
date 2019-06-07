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
      name: 'closeBtnPosition',
      description: 'The position of the close modal button, in relation to the modal.',
      defaultValue: 'inside',
      inputValues: ['inside', 'outside', 'hidden'],
    },
    {
      name: 'closeIcon',
      description: 'The name of the icon that will appear on the default close modal button',
      defaultValue: 'close',
      inputValues: ['close', 'arrow'],
    },
    {
      name: 'titleHorizontalAlignment',
      description: 'The horizontal placement of the modal title.',
      defaultValue: 'left',
      inputValues: ['left', 'center', 'right'],
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
    {
      name: 'componentProps',
      description: 'The data to pass to the modal component.',
      defaultValue: '',
      inputValues: ['undefined | { [key: string]: any; }'],
    },
  ];
}
