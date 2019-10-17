import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-modal-showcase',
  templateUrl: './modal-showcase.component.html',
  preserveWhitespaces: true,
})
export class ModalShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/modal-example/modal-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The header of the modal',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'component',
      description: 'The component which will be rendered inside the modal.',
      defaultValue: '',
      inputValues: ['Component'],
    },
    {
      name: 'flavor',
      description:
        "The flavor of the modal. Modals with 'modal' flavor fade-in/out and have a close button placed in the top right corner. Modals with a 'drawer' flavor slide-up/down and have a arrow-down button placed in the top left corner.",
      defaultValue: 'modal',
      inputValues: ['modal', 'drawer'],
    },
    {
      name: 'drawerSupplementaryAction',
      description:
        "(Optional) Allows placing a supplementary button in the top right corner of drawers. Note that this is only available on modals with a 'drawer' flavor",
      defaultValue: '',
      inputValues: ['{iconName: string, action: Function}'],
    },
    {
      name: 'dim',
      description:
        'The transparency of the background of the modal. 0 is fully transparent, while 1 is fully visible.',
      defaultValue: '0.5',
      inputValues: ['number (0..1)'],
    },
    {
      name: 'componentProps',
      description: 'The data to pass to the modal component.',
      defaultValue: '',
      inputValues: ['undefined | { [key: string]: any; }'],
    },
  ];
}
