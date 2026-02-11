import { Meta, StoryObj } from '@storybook/angular';
import { MultiSelectAutocomplete } from '@kirbydesign/extensions-angular/multi-select-autocomplete';
import { expect, userEvent, waitFor, within } from 'storybook/test';

type CurrencyItem = { code: string; name: string };

const currencyItems: CurrencyItem[] = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'GBP', name: 'British Pound Sterling' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'NZD', name: 'New Zealand Dollar' },
];
const mySearchFunction = (searchTerm: string): unknown[] => {
  return currencyItems.filter((item) => item.code.toLowerCase().includes(searchTerm.toLowerCase()));
};
type Args = {
  items: CurrencyItem[];
  searchFunction: (searchTerm: string) => unknown[];
  placeholder: string;
  itemTextProperty: string;
};

const meta: Meta<MultiSelectAutocomplete & Args> = {
  component: MultiSelectAutocomplete,
  title: 'Components/MultiSelectAutocomplete',
};
export default meta;

type Story = StoryObj<MultiSelectAutocomplete & Args>;

// export const MultiSelectAuto: Story = {
//   args: {
//     items: currencyItems,
//     placeholder: 'Please select:',
//     itemTextProperty: 'text',
//     attentionLevel: '3',
//     disabled: false,
//     hasError: false,
//     size: InputSize.medium,
//     tabindex: 0,
//     searchFunction: mySearchFunction,
//   },
//   argTypes: {
//     attentionLevel: {
//       options: ['1', '2', '3'],
//       control: { type: 'radio' },
//     },
//     size: {
//       options: ['md', 'lg'],
//       control: { type: 'radio' },
//     },
//     expand: {
//       options: [undefined, 'block'],
//       control: { type: 'radio' },
//     },
//   },
// };

export const WithTemplate: Story = {
  parameters: {
    chromatic: {
      modes: {
        mobile: { disable: true },
      },
    },
  },
  args: {
    items: currencyItems,
    searchFunction: mySearchFunction,
    placeholder: 'Select currencies',
    // IMPORTANT: items are shaped as { code, name }, so the component must use `code` as text.
    // Otherwise getTextFromItem() returns '' and the dropdown options appear empty.
    itemTextProperty: 'code',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-multi-select-autocomplete
        [items]="items"
        [searchFunction]="searchFunction"
        [placeholder]="placeholder"
        [itemTextProperty]="itemTextProperty"
      >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused"
          [selectable]="true"
          [selected]="selected"
          [class.focused]="focused"
          role="option"
          [attr.id]="dropdownId + '-item-' + item.code"
          [attr.aria-selected]="selected"
        >
          <kirby-label>
            <p class="kirby-item-title">{{ item.code }}</p>
            <p class="kirby-item-detail">{{ item.name }}</p>
          </kirby-label>
        </kirby-item>
      </kirby-multi-select-autocomplete>

      <button kirby-button style="position: absolute; top: 0; right: 0;" data-testid="outside-close-btn">
        Outside Close
      </button>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdown = canvas.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });

    const outsideButton = canvas.getByTestId('outside-close-btn');
    await userEvent.click(outsideButton);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    });
  },
};
