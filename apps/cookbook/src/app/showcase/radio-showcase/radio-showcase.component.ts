import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-radio-showcase',
  templateUrl: './radio-showcase.component.html',
  styleUrls: ['./radio-showcase.component.scss'],
})
export class RadioShowcaseComponent {
  radioProperties: ApiDescriptionProperty[] = [
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

  radioGroupProperties: ApiDescriptionProperty[] = [
    {
      name: 'items',
      description: 'The items rendered within the radio group.',
      defaultValue: '[]',
      type: ['Array<string> | Array<any>'],
    },
    {
      name: 'value',
      description:
        'The selected value of the kirby-radio-group, corresponding to a value set on a kirby-radio.',
      defaultValue: 'undefined',
      type: ['any'],
    },
    {
      name: 'selectedIndex',
      description: 'The index of the selected item within the `items` array.',
      defaultValue: '-1',
      type: ['number'],
    },
    {
      name: 'itemTextProperty',
      description:
        'The property to use for the text representation of items when configured with `Array<any>`.',
      defaultValue: `'text'`,
      type: ['string'],
    },
    {
      name: 'itemDisabledProperty',
      description:
        'The property to use for whether the option is disabled when items is configured with `Array<any>`.',
      defaultValue: `'disabled'`,
      type: ['string'],
    },
  ];

  groupEvents: ApiDescriptionEvent[] = [
    {
      name: 'valueChange',
      description: 'Emitted when the selected value changes',
      signature: '(value: any) => void',
    },
  ];
}
