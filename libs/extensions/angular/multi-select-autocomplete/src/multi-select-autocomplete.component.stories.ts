import type { Meta, StoryObj } from '@storybook/angular';
import { MultiSelectAutocomplete } from '@kirbydesign/extensions-angular/multi-select-autocomplete';
import { expect } from 'storybook/test';
import { InputSize } from '@kirbydesign/designsystem/form-field';

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Country 1',
  'Country 2',
  'Country 3',
  'Country 4',
  'Country 5',
];
const mySearchFunction = (searchTerm: string): string[] | any[] => {
  return items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
};
const meta: Meta<MultiSelectAutocomplete> = {
  component: MultiSelectAutocomplete,
  title: 'Components/MultiSelectAutocomplete',
};
export default meta;

type Story = StoryObj<MultiSelectAutocomplete>;

export const MultiSelectAuto: Story = {
  args: {
    items: items,
    placeholder: 'Please select:',
    itemTextProperty: 'text',
    attentionLevel: '3',
    disabled: false,
    hasError: false,
    size: InputSize.medium,
    tabindex: 0,
    searchFunction: mySearchFunction,
  },
  argTypes: {
    attentionLevel: {
      options: ['1', '2', '3'],
      control: { type: 'radio' },
    },
    size: {
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    expand: {
      options: [undefined, 'block'],
      control: { type: 'radio' },
    },
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/multi-select-autocomplete/gi)).toBeTruthy();
  },
};
