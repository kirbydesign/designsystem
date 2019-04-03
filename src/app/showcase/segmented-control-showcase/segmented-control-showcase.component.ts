import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;
@Component({
  selector: 'kirby-segmented-control-showcase',
  templateUrl: './segmented-control-showcase.component.html',
  styleUrls: ['./segmented-control-showcase.component.scss'],
})
export class SegmentedControlShowcaseComponent {
  exampleHtml: string = require('../../examples/segmented-control-example/segmented-control-example.component.html');

  properties: ShowcaseProperty[] = [
    {
      name: 'segmentItems',
      description: 'Array of SegmentItem',
      defaultValue: '',
      inputValues: ['segmentItems[]'],
    },
  ];
}
