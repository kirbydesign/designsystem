import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-radio-showcase',
  templateUrl: './radio-showcase.component.html',
  styleUrls: ['./radio-showcase.component.scss'],
})
export class RadioShowcaseComponent {
  buttonProperties: ShowcaseProperty[] = [
    {
      name: 'value',
      description: 'The value represented by the radio button.',
      defaultValue: 'undefined',
      inputValues: ['any'],
    },
    {
      name: 'disabled',
      description: 'Disables the radio button so that the user cannot interact with it.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
  ];

  groupProperties: ShowcaseProperty[] = [
    {
      name: 'items',
      description: 'The items rendered within the radio group.',
      defaultValue: '[]',
      inputValues: ['Array<string> | Array<any>'],
    },
    {
      name: 'value',
      description:
        'The selected value of the kirby-radio-group, corresponding to a value set on a kirby-radio.',
      defaultValue: 'undefined',
      inputValues: ['any'],
    },
    {
      name: 'itemTextProperty',
      description:
        'The property to use for the text representation of items when configured with `Array<any>`.',
      defaultValue: `'text'`,
      inputValues: ['string'],
    },
    {
      name: 'itemDisabledProperty',
      description:
        'The property to use for whether the option is disabled when items is configured with `Array<any>`.',
      defaultValue: `'disabled'`,
      inputValues: ['string'],
    },
  ];

  groupEvents: ShowcaseProperty[] = [
    {
      name: 'change',
      description: 'Emitted when the selected value changes',
      inputValues: ['(value: any) => void'],
    },
  ];

  eventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
