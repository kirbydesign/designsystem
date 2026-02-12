import { Meta, StoryObj } from '@storybook/angular';
import { MultiSelectAutocomplete } from '@kirbydesign/extensions-angular/multi-select-autocomplete';

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
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'NOK', name: 'Norwegian Krone' },
  { code: 'KRW', name: 'South Korean Won' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'DKK', name: 'Danish Krone' },
  { code: 'PLN', name: 'Polish Zloty' },
  { code: 'TWD', name: 'New Taiwan Dollar' },
  { code: 'THB', name: 'Thai Baht' },
];

const myDisplayStringFunction = (item: unknown): string => {
  if (item === undefined) {
    return '';
  }

  const currency = item as CurrencyItem;
  return `${currency.code} - ${currency.name}`;
};

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
    displayStringFunction: myDisplayStringFunction,
    placeholder: 'Select currencies',
    itemTextProperty: 'code',
    disabled: false,
    attentionLevel: '1',
    hasError: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-multi-select-autocomplete
        [items]="items"
        [displayStringFunction]="displayStringFunction"
        [searchFunction]="searchFunction"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [attentionLevel]="attentionLevel"
        [hasError]="hasError"
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
    `,
  }),
};
