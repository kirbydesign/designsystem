import { Component } from '@angular/core';
import {
  defaultEventColumns,
  ShowcaseProperty,
  ShowcasePropertyColumns,
} from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-dropdown-showcase',
  templateUrl: './dropdown-showcase.component.html',
  styleUrls: ['./dropdown-showcase.component.scss'],
})
export class DropdownShowcaseComponent {
  size: string = 'md';
  properties: ShowcaseProperty[] = [
    {
      name: 'items',
      description: 'The items rendered within the dropdown.',
      defaultValue: '[ ]',
      inputValues: ['Array<string> | Array<any>'],
    },
    {
      name: 'itemTextProperty',
      description:
        'The property to use for the text representation of items when configured with `Array<any>`.',
      defaultValue: `'text'`,
      inputValues: ['string'],
    },
    {
      name: 'value',
      description: 'The currently selected item (readonly).',
      defaultValue: 'undefined',
      inputValues: ['string | any'],
    },
    {
      name: 'selectedIndex',
      description: 'The index of the selected item within the `items` array.',
      defaultValue: 'undefined',
      inputValues: ['number'],
    },
    {
      name: 'disabled',
      description: 'Disables the dropdown so the the user cannot interact with it.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'placeholder',
      defaultValue: `'Please select:'`,
      description: 'Instructional text to show before the dropdown has a selected option.',
      inputValues: ['string'],
    },
    {
      name: 'attentionLevel',
      description:
        'Sets the attention level for the button of the dropdown. Button color will be updated automatically depending on host color.',
      defaultValue: '3',
      inputValues: ['1', '2', '3', '4'],
    },
    {
      name: 'expand',
      description:
        'If the dropdown needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'undefined',
      inputValues: ['block'],
    },
  ];

  methods: ShowcaseProperty[] = [
    {
      name: 'toggle()',
      description: 'Toggles the open/closed state of the dropdown.',
    },
    {
      name: 'open()',
      description: 'Opens the dropdown.',
    },
    {
      name: 'close()',
      description: 'Closes the dropdown.',
    },
  ];

  methodColumns: ShowcasePropertyColumns = {
    Name: 'Name',
    Description: 'Description',
  };

  events: ShowcaseProperty[] = [
    {
      name: 'change',
      description: 'Emitted when an item is selected (tap on mobile, click/keypress on web)',
      inputValues: ['(item: string | any) => void'],
    },
  ];

  eventColumns: ShowcasePropertyColumns = defaultEventColumns;

  setSize(size: string) {
    this.size = size;
  }
}
