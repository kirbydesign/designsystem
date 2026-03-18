import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MultiSelectAutocompleteComponent } from '@kirbydesign/extensions-angular/multi-select-autocomplete';

import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { InputComponent } from '@kirbydesign/designsystem/form-field';

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

/**
 * The Combobox is a form control that allows the user to filter and select from a list of options. It combines the functionality of a dropdown and an input field, providing an efficient way to handle large datasets while maintaining a clean and user-friendly interface.
 * The user can type in the input field to filter the options, and the dropdown will display only the matching items. This component is ideal for scenarios where there are many options to choose from, such as selecting a country, city, or in this case, a currency.
 */
const meta: Meta<MultiSelectAutocompleteComponent> = {
  component: MultiSelectAutocompleteComponent,
  title: 'Components/Forms/Multi Select Autocomplete',
  decorators: [
    moduleMetadata({
      imports: [
        ListModule,
        ItemModule,
        DropdownModule,
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
    placeholder: 'Select currencies but very much longer',
    disabled: false,
    hasError: false,
  },
};

/**
 * In this example, the items are objects with 'code' and 'name' properties.
 * By setting the 'itemTextProperty' to 'code', the component will display the currency codes in the dropdown.
 * The filtering will be based on the itemTextProperty, so when the user types in the input field, it will filter the options based on the currency codes, and the dropdown will display only the matching items.
 */
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

/**
 * This example demonstrates how to use a custom template for the dropdown items.
 * The items are objects with 'code' and 'name' properties, and we set the 'itemTextProperty' to 'code' to display the currency codes when an item is selected.
 * The custom template allows us to display both the currency code and name in a more visually appealing way.
 * The filtering will still be based on the itemTextProperty, so when the user types in the input field, it will filter the options based on the currency codes, and the dropdown will display only the matching items with their corresponding names.
 */
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
    },
    template: `
      <kirby-multi-select-autocomplete
        [items]="items"
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

/**
 * This example demonstrates how to use a custom search function to filter the options in the dropdown.
 * The 'searchFunction' property allows you to provide a custom function that takes the search term as input and returns an array of matching items.
 * In this example, the custom search function filters the currency items based on their 'name' property, allowing the user to search for currencies by their full names instead of just their codes.
 * When the user types in the input field, the custom search function will be called with the current search term, and it will return only the items whose names include the search term, which will then be displayed in the dropdown.
 */
export const CustomSearchFunction: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'code',
    placeholder: 'Select currencies',
    disabled: false,
    hasError: false,
  },
  render: (args) => ({
    props: {
      ...args,
      searchFunction: (term: string) => {
        const lowerTerm = term.toLowerCase();
        return currencyItems.filter((item) => item.name.toLowerCase().includes(lowerTerm));
      },
    },
    template: `
      <kirby-multi-select-autocomplete
        [items]="items"
        [itemIdProperty]="itemIdProperty"
        [itemTextProperty]="itemTextProperty"
        [placeholder]="placeholder"
        [searchFunction]="searchFunction"
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

/**
 * This example demonstrates the disabled state of the component. When the 'disabled' property is set to true, the input field will be non-interactive, and the user will not be able to open the dropdown or select any options.
 */
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

/**
 * This example demonstrates the error state of the component.
 * When the 'hasError' property is set to true, the input field will be styled to indicate that there is an error.
 */
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

/**
 * This example demonstrates the different sizes of the component. The 'size' property can be set to 'md', or 'lg' to adjust the size of the input field and dropdown.
 * In this example, we show both 'md' and 'lg' sizes to illustrate the difference in appearance.
 * The placeholder text is intentionally long to demonstrate how the component handles long text in different sizes.
 */
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

/**
 * This example demonstrates the 'expand' property of the component.
 * When the 'expand' property is set to 'block', the component will take up the full width of its container.
 */
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
