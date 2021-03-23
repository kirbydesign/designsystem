import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-range-showcase',
  templateUrl: './range-showcase.component.html',
  styleUrls: ['./range-showcase.component.scss'],
})
export class RangeShowcaseComponent {
  rangeProperties: ApiDescriptionProperty[] = [
    {
      name: 'value',
      description: 'The value represented by the radio button.',
      defaultValue: 'undefined',
      type: ['any'],
    },
    {
      name: 'disabled',
      description: 'Disables the radio button so that the user cannot interact with it.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'text',
      description: 'Adds a label text. This is mandatory when used in a plain radio button list.',
      type: ['string'],
    },
  ];
}
