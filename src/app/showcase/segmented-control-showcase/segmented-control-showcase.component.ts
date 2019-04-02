import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-segmented-control-showcase',
  templateUrl: './segmented-control-showcase.component.html',
  styleUrls: ['./segmented-control-showcase.component.scss'],
})
export class SegmentedControlShowcaseComponent{
  exampleHtml: string = require('../../examples/segmented-control-example/segmented-control-example.component.html');

  properties: ShowcaseProperty[] = [
    {
      name: 'showShadow',
      description: 'Determines whether the button will have a shadow or not.',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
  ];
}
