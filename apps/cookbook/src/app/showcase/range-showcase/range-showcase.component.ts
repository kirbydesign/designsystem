import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-range-showcase',
  templateUrl: './range-showcase.component.html',
  styleUrls: ['./range-showcase.component.scss'],
})
export class RangeShowcaseComponent {
  rangeProperties: ShowcaseProperty[] = [
    {
      name: 'value',
      description: 'The value represented by the range component.',
      defaultValue: '0',
      inputValues: ['any'],
    },
    {
      name: 'disabled',
      description: 'Disables the range component so that the user cannot interact with it.',
      defaultValue: '1',
      inputValues: ['42', '4711'],
    },
  ];
}
