import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ComboboxComponent } from '@kirbydesign/extensions-angular/combobox';

import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { InputComponent } from '@kirbydesign/designsystem/form-field';

type CurrencyItem = { code: string; name: string };

const simpleCurrencyItems: string[] = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SEK',
  'NZD',
  'MXN',
  'SGD',
  'HKD',
  'NOK',
  'KRW',
  'TRY',
  'RUB',
  'INR',
  'BRL',
  'ZAR',
  'DKK',
  'PLN',
  'TWD',
  'THB',
];
const currencyItems5000: CurrencyItem[] = [];
for (let i = 0; i < 5000; i++) {
  currencyItems5000.push({ code: `CUR${i}`, name: `Currency ${i}` });
}

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

/**
 * The Combobox is a form control that allows the user to filter and select from a list of options. It combines the functionality of a dropdown and an input field, providing an efficient way to handle large datasets while maintaining a clean and user-friendly interface.
 * The user can type in the input field to filter the options, and the dropdown will display only the matching items. This component is ideal for scenarios where there are many options to choose from, such as selecting a country, city, or in this case, a currency.
 */
const meta: Meta<ComboboxComponent> = {
  component: ComboboxComponent,
  title: 'Components/Combobox',
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ListModule, ItemModule, DropdownModule, InputComponent, ComboboxComponent],
    }),
  ],
  parameters: {
    actions: { handles: ['selectionChange'] },
    controls: {
      include: [
        'items',
        'selectedItem',
        'itemTextProperty',
        'itemIdProperty',
        'placeholder',
        'popout',
        'expand',
        'disabled',
        'itemHeight',
        'noSearchResultsText',
        'searchFunction',
        'hasError',
        'hasErrorChange',
        'size',
        'change',
      ],
    },
  },
  argTypes: {
    items: { control: false },
    searchFunction: { control: false },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    itemHeight: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<ComboboxComponent>;

/**
 * This is a default combobox with a simple list of string items. The user can type in the input field to filter the options, and the dropdown will display only the matching items.
 * The placeholder text is intentionally long to demonstrate how the component handles long text and to ensure that it does not break the layout or cause any visual issues.
 * The component should gracefully handle the long placeholder text without affecting the overall user experience.
 * All the currencies are simple strings, and the component will use the default behavior to display them in the dropdown.
 * The filtering is based on the string values of the items, so when the user types in the input field, it will filter the options based on the currency codes, and the dropdown will display only the matching items.
 */
export const Default: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-combobox
        [items]="items"
        [placeholder]="placeholder"
      >
      </kirby-x-combobox>
    `,
  }),
};

/**
 * By setting the 'itemTextProperty' to 'code', the component will display the currency codes in the dropdown.
 * The filtering will be based on the itemTextProperty, so when the user types in the input field, it will filter the options based on the currency codes, and the dropdown will display only the matching items.
 * Note: itemIdProperty is also set, for scrolling to work properly on complex objects.
 */
export const WithTextProperty: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'code',
    itemIdProperty: 'code',
    placeholder: 'Select currencies',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-combobox
        [items]="items" 
        [itemTextProperty]="itemTextProperty"
        [itemIdProperty]="itemIdProperty"
        [placeholder]="placeholder"
      >
      </kirby-x-combobox>
    `,
  }),
};

/**
 * The items are objects with 'code' and 'name' properties.
 * Because the item rendered by the DOM has changed, it is up to the developer to set 'itemHeight' to ensure that the component can calculate the height of the dropdown and scroll to the selected item when the dropdown is opened.
 * When using a custom template, it's important to ensure that the 'itemIdProperty' is set correctly and is equal to '[attr.id]' selecting and scrolling to work properly, as the component relies on the item IDs to manage selection and focus within the dropdown.
 */
export const WithTemplate: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'code',
    itemIdProperty: 'code',
    placeholder: 'Select currencies',
    itemHeight: 56,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox
        [items]="items"
        [itemIdProperty]="itemIdProperty"
        [itemTextProperty]="itemTextProperty"
        [itemHeight]="itemHeight"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [hasError]="hasError"
      >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused;"
          role="option"
          [selectable]="true"
          [selected]="selected"
          [class.focused]="focused"
          [attr.aria-selected]="selected"
          [attr.id]="item.code"
        >
          <kirby-label>
            <p class="kirby-item-title">{{ item.code }}</p>
            <p class="kirby-item-detail">{{ item.name }}</p>
          </kirby-label>
        </kirby-item>
      </kirby-x-combobox>
    `,
  }),
};

/**
 * The 'searchFunction' property allows you to provide a custom function that takes the search term as input and returns an array of matching items.
 * In this example, the custom search function filters the currency items based on their 'name' property.
 */
export const CustomSearchFunction: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'name',
    itemIdProperty: 'code',
    itemHeight: 56,
    placeholder: 'Select currencies',
  },
  render: (args) => ({
    props: {
      ...args,
      searchFunction: (term: string, itemsToSearch: CurrencyItem[]) => {
        const lowerTerm = term.toLowerCase();
        return itemsToSearch.filter((item) => item.name.toLowerCase().includes(lowerTerm));
      },
    },
    template: `
      <kirby-x-combobox
        [items]="items"
        [itemIdProperty]="itemIdProperty"
        [itemTextProperty]="itemTextProperty"
        [itemHeight]="itemHeight"
        [placeholder]="placeholder"
        [searchFunction]="searchFunction"
      >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused;"
          [size]="'sm'"
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
      </kirby-x-combobox>
    `,
  }),
};

/**
 * The 'items' property is set to an array of 5000 currency items, which simulates a scenario where there are many options to choose from.
 */
export const LargeList: Story = {
  args: {
    items: currencyItems5000,
    itemTextProperty: 'code',
    itemIdProperty: 'code',
    itemHeight: 56,
    placeholder: 'Select currencies',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox
        [items]="items"
        [itemIdProperty]="itemIdProperty"
        [itemTextProperty]="itemTextProperty"
        [itemHeight]="itemHeight"
        [placeholder]="placeholder"
      >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused;"
          [size]="'sm'"
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
      </kirby-x-combobox>
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
      <kirby-x-combobox
        [placeholder]="placeholder"
        [disabled]="disabled"
      >
      </kirby-x-combobox>
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
      <kirby-x-combobox
        [placeholder]="placeholder"
        [hasError]="hasError"
      >
      </kirby-x-combobox>
    `,
  }),
};

export const Sizes: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div>
        <kirby-x-combobox
          [placeholder]="placeholder"
          [items]="items"
          [size]="'md'"
        >
        </kirby-x-combobox>
        <p><br></p>
        <kirby-x-combobox
          [placeholder]="placeholder"
          [items]="items"
          [size]="'lg'"
        >
        </kirby-x-combobox>
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
      <kirby-x-combobox
        [placeholder]="placeholder"
        [items]="items"
        [expand]="expand"
      >
      </kirby-x-combobox>
    `,
  }),
};
