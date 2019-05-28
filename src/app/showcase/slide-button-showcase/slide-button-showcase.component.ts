import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-slide-button-showcase',
  templateUrl: './slide-button-showcase.component.html',
  styleUrls: ['./slide-button-showcase.component.scss'],
})
export class SlideButtonShowcaseComponent {
  exampleHtml: string = require('../../examples/slide-button-example/slide-button-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      inputValues: ['fullWidth'],
    },
  ];
}
