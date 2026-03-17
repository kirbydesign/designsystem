import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MultiSelectAutocompleteComponent } from '@kirbydesign/extensions-angular/multi-select-autocomplete';

import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { FormFieldModule, InputComponent } from '@kirbydesign/designsystem/form-field';

type CurrencyItem = { code: string; name: string };
const simpleCurrencyItems: string[] = ['USD', 'EUR', 'JPY', 'GBP', 'AUD'];
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

const mySearchFunction = (searchTerm: string): unknown[] => {
  return currencyItems.filter((item) => item.code.toLowerCase().includes(searchTerm.toLowerCase()));
};

const meta: Meta<MultiSelectAutocompleteComponent> = {
  component: MultiSelectAutocompleteComponent,
  title: 'Components/Forms/Multi Select Autocomplete',
  decorators: [
    moduleMetadata({
      imports: [
        ListModule,
        ItemModule,
        DropdownModule,
        FormFieldModule,
        InputComponent,
        MultiSelectAutocompleteComponent,
      ],
    }),
  ],
  parameters: {
    actions: { handles: ['selectionChange'] },
    controls: { exclude: ['dropdownId', 'displayStringFunction', 'searchFunction'] },
  },
  argTypes: {
    items: { control: false },
    searchFunction: { control: false },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<MultiSelectAutocompleteComponent>;

export const Default: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies but very much longer',
    disabled: false,
    hasError: false,
  },
};

export const WithTextProperty: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'code',
    placeholder: 'Select currencies',
    disabled: false,
    hasError: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-multi-select-autocomplete
        [items]="items" 
        [itemTextProperty]="itemTextProperty"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [hasError]="hasError"
      >
      </kirby-multi-select-autocomplete>
    `,
  }),
};

export const WithTemplate: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'code',
    itemIdProperty: 'code',
    placeholder: 'Select currencies',
    disabled: false,
    hasError: false,
  },
  render: (args) => ({
    props: {
      ...args,
      stableSearchFunction: mySearchFunction,
    },
    template: `
      <kirby-multi-select-autocomplete
        [items]="items"
        [searchFunction]="stableSearchFunction"
        [itemIdProperty]="itemIdProperty"
        [itemTextProperty]="itemTextProperty"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [hasError]="hasError"
      >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused"
          [selectable]="true"
          [selected]="selected"
          [class.focused]="focused"
          role="option"
          [attr.aria-selected]="selected"
          [attr.id]="item.code"
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

export const Disabled: Story = {
  args: {
    placeholder: 'Select currencies',
    disabled: true,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-multi-select-autocomplete
        [placeholder]="placeholder"
        [disabled]="disabled"
      >
      </kirby-multi-select-autocomplete>
    `,
  }),
};

export const HasError: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies',
    hasError: true,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-multi-select-autocomplete
        [placeholder]="placeholder"
        [hasError]="hasError"
      >
      </kirby-multi-select-autocomplete>
    `,
  }),
};

export const WithFormField: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies but very long',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-form-field 
        [label]="'label'"
        [message]="'message'">
        <kirby-dropdown
          [placeholder]="placeholder"
          [items]="items"
          [size]="'md'"
        >
        </kirby-dropdown>
      </kirby-form-field>

      <kirby-form-field 
        [label]="'label'"
        [message]="'message'">
        <kirby-multi-select-autocomplete
          [placeholder]="placeholder"
          [items]="items"
        >
        </kirby-multi-select-autocomplete>
      </kirby-form-field>
    `,
  }),
};

export const Sizes: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies but very long',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div>
        <kirby-multi-select-autocomplete
          [placeholder]="placeholder"
          [items]="items"
          [size]="'md'"
        >
        </kirby-multi-select-autocomplete>
        <p><br></p>
        <kirby-multi-select-autocomplete
          [placeholder]="placeholder"
          [items]="items"
          [size]="'lg'"
        >
        </kirby-multi-select-autocomplete>
      </div>
    `,
  }),
};

export const ExpandBlock: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies but very long',
    expand: 'block',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-multi-select-autocomplete
        [placeholder]="placeholder"
        [items]="items"
        [expand]="expand"
      >
      </kirby-multi-select-autocomplete>
    `,
  }),
};
