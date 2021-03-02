import { Component } from '@angular/core';
import {
  defaultEventColumns,
  ShowcaseEvent,
  ShowcaseEventColumns,
} from '~/app/shared/showcase-events/showcase-event';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-radio-showcase',
  templateUrl: './radio-showcase.component.html',
  styleUrls: ['./radio-showcase.component.scss'],
})
export class RadioShowcaseComponent {
  radioProperties: ShowcaseProperty[] = [
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
    {
      name: 'text',
      description: 'Adds a label text. This is mandatory when used in a plain radio button list.',
      inputValues: ['string'],
    },
  ];

  radioGroupProperties: ShowcaseProperty[] = [
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
      name: 'selectedIndex',
      description: 'The index of the selected item within the `items` array.',
      defaultValue: '-1',
      inputValues: ['number'],
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

  groupEvents: ShowcaseEvent[] = [
    {
      name: 'valueChange',
      description: 'Emitted when the selected value changes',
      inputValues: ['(value: any) => void'],
    },
  ];

  eventColumns: ShowcaseEventColumns = defaultEventColumns;
}
