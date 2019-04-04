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
    // {
    //   name: 'showShadow',
    //   description: 'Determines whether the button will have a shadow or not.',
    //   defaultValue: 'true',
    //   inputValues: ['boolean'],
    // },
  ];
}
