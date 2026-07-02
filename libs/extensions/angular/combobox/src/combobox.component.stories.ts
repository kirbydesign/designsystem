import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ComboboxComponent, GroupSettings } from '@kirbydesign/extensions-angular/combobox';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import {
  FormFieldComponent,
  InputComponent,
  InputSize,
} from '@kirbydesign/designsystem/form-field';
import { HorizontalDirection } from '@kirbydesign/designsystem/popover';
import { IconModule } from '@kirbydesign/designsystem/icon';

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
 * The Combobox is a form control that allows the user to filter and select from a list of options.
 * A Combobox is useful when there are many options to filter through and choose from, such as selecting a country, city or currency.
 */
const meta: Meta<ComboboxComponent> = {
  component: ComboboxComponent,
  title: 'Components/Combobox',
  decorators: [
    moduleMetadata({
      imports: [
        ListModule,
        ItemModule,
        InputComponent,
        ComboboxComponent,
        FormFieldComponent,
        ReactiveFormsModule,
        IconModule,
      ],
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
        'selectionClearedAnnouncement',
        'searchFunction',
        'groupSettings',
        'hasError',
        'hasErrorChange',
        'size',
        'change',
      ],
    },
  },
  argTypes: {
    items: { control: false },
    selectedItem: { control: 'object' },
    searchFunction: { control: false },
    hasErrorChange: { control: false },
    change: { control: false },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    hasError: { control: 'boolean' },
    itemHeight: { control: 'number' },
    itemTextProperty: { control: 'text' },
    itemIdProperty: { control: 'text' },
    noSearchResultsText: { control: 'text' },
    size: {
      control: 'select',
      options: Object.values(InputSize),
    },
    expand: {
      control: 'select',
      options: [undefined, 'block'],
    },
    popout: {
      control: 'select',
      options: Object.values(HorizontalDirection),
    },
  },
};
export default meta;

type Story = StoryObj<ComboboxComponent>;

/**
 * When a user starts typing in the input field, options are filtered so the dropdown will display only matching items. When given a simple list of string, the default filtering matches directly against  the value of each string.
 * A selected value can be cleared by deleting the text.
 */
export const Default: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currency',
    disabled: false,
    hasError: false,
    itemHeight: 44,
    itemTextProperty: 'text',
    itemIdProperty: 'id',
    noSearchResultsText: 'No results found.',
    size: InputSize.medium,
    expand: undefined,
    popout: HorizontalDirection.right,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} />
    `,
  }),
};

/**
 * When the items array consists of objects rather than simple strings, the `itemTextProperty` can be used to identify what property the dropdown should use for displaying values and filtering matches.
 */
export const WithTextProperty: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'name',
    itemIdProperty: 'code',
    placeholder: 'Select currency',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} />
    `,
  }),
};

/**
 * This example demonstrates how to use a custom template for items shown in the dropdown.
 * Since the combobox no longer controls the visual appearance of the items, `itemHeight` should be supplied to ensure correct dropdown height and scroll-into-view functionality.
 * Additionally, `itemIdProperty` should be set to match `[attr.id]` of the item template, as the id is used to manage selection and focus.
 */
export const WithTemplate: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'code',
    itemIdProperty: 'code',
    placeholder: 'Select currency',
    itemHeight: 56,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused;"
          role="option"
          [selectable]="true"
          [selected]="selected"
          [class.keyboard-focused]="focused"
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
 * The `searchFunction` property allows you to provide a custom function that takes the search term as input and returns an array of matching items.
 * In this example, the custom search function filters the currency items based on their `name` property.
 */
export const CustomSearchFunction: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'name',
    itemIdProperty: 'code',
    itemHeight: 56,
    placeholder: 'Select currency',
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
      <kirby-x-combobox ${argsToTemplate(args)} >
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused;"
          [size]="'sm'"
          [selectable]="true"
          [selected]="selected"
          [class.keyboard-focused]="focused"
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
 * The `items` property is set to an array of 5000 currency items, which simulates a scenario where there are many options to choose from.
 */
export const LargeList: Story = {
  args: {
    items: currencyItems5000,
    itemTextProperty: 'code',
    itemIdProperty: 'code',
    itemHeight: 56,
    placeholder: 'Select currency',
  },
  render: (args) => ({
    props: {
      ...args,
      groupSettings: currencyGroupSettings,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} [groupSettings]="groupSettings">
        <kirby-item
          *kirbyListItemTemplate="let item; let selected = selected; let focused = focused;"
          [size]="'sm'"
          [selectable]="true"
          [selected]="selected"
          [class.keyboard-focused]="focused"
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
 * When the `disabled` property is set to true, the input field will be non-interactive, and the user will not be able to open the dropdown or select any options.
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Select currency',
    disabled: true,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} />
    `,
  }),
};

/**
 * When the `hasError` property is set to true, the input field will be styled to indicate that there is an error.
 */
export const HasError: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currency',
    hasError: true,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} />
    `,
  }),
};
/**
 * The `size` property defaults to `md`, and can be set to `lg` to display a larger input field.
 * While the sizes are generally interchangeable, it is important to use them consistently for elements in the same form.
 */
export const LargeSize: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currency',
    size: InputSize.large,
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} />
    `,
  }),
};

/*
 * To display the combobox in full width of its container, apply the expand styling to the combobox.
 */
export const ExpandBlock: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currency',
    expand: 'block',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} />
    `,
  }),
};

export const Focused: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currency',
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <kirby-x-combobox [placeholder]="placeholder" [items]="items"></kirby-x-combobox>
    `,
  }),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('kirby-x-combobox input');
    if (input) {
      (input as HTMLElement).focus();
    }
  },
};

/**
 * When the `groupSettings` property is provided, items in the dropdown are grouped under headers.
 * Each entry in the array defines a group with an `id`, a `displayName`, and a `condition`
 * predicate. Groups are rendered in array order. Items that match no group are appended ungrouped
 * at the end. Group headers cannot be selected.
 *
 * In this example the currencies are grouped into **Europe**, **America** and **Other**.
 */
const europeanCurrencyCodes = new Set(['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'RUB']);
const americanCurrencyCodes = new Set(['USD', 'CAD', 'MXN', 'BRL']);

const currencyGroupSettings: GroupSettings<CurrencyItem> = [
  {
    id: 'europe',
    displayName: 'Europe',
    condition: (item) => europeanCurrencyCodes.has(item.code),
  },
  {
    id: 'america',
    displayName: 'America',
    condition: (item) => americanCurrencyCodes.has(item.code),
  },
  {
    id: 'other',
    displayName: 'Other',
    height: 44,
    condition: () => true, // catch-all
  },
];

export const WithGrouping: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'name',
    itemIdProperty: 'code',
    placeholder: 'Select currency',
  },
  render: (args) => ({
    props: {
      ...args,
      groupSettings: currencyGroupSettings,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} [groupSettings]="groupSettings" />
    `,
  }),
};

/**
 * Provide a `#groupHeaderTemplate` to override the default group header rendering.
 * The template context exposes the `GroupItem` as `$implicit`, giving access to
 * both `id` and `displayName`.
 */
export const WithGroupHeaderTemplate: Story = {
  args: {
    items: currencyItems,
    itemTextProperty: 'name',
    itemIdProperty: 'code',
    placeholder: 'Select currency',
  },
  render: (args) => ({
    props: {
      ...args,
      groupSettings: currencyGroupSettings,
    },
    template: `
      <kirby-x-combobox ${argsToTemplate(args)} [groupSettings]="groupSettings">
        <ng-template #groupHeaderTemplate let-group>
          <kirby-item>
              <kirby-label>
              <p class="kirby-item-detail">{{ group.displayName }}</p>
            </kirby-label>
            <kirby-icon name="moneybag" slot="end"/>
          </kirby-item>
        </ng-template>
      </kirby-x-combobox>
    `,
  }),
};
/*
 * with a reactive `FormControl`. It validates that:
 * - The form-field label and message render correctly around the combobox
 * - The combobox participates in Angular reactive forms (value binding, validation)
 * - Required validation triggers the error state on the form-field
 *
 * Try selecting a value and then clearing it to see the validation error appear.
 */
export const FormField: Story = {
  args: {
    items: simpleCurrencyItems,
    placeholder: 'Select currencies',
  },
  render: (args) => ({
    props: {
      ...args,
      currencyControl: new FormControl(null, Validators.required),
    },
    template: `
      <form>
        <kirby-form-field
          [label]="'Currency'"
          [message]="currencyControl.touched && currencyControl.invalid ? 'Please select a currency' : 'Pick your preferred currency'"
        >
          <kirby-x-combobox
            ${argsToTemplate(args, { exclude: ['items', 'placeholder', 'hasError'] })}      
            [items]="items"
            [placeholder]="placeholder"
            [formControl]="currencyControl"
            [hasError]="currencyControl.touched && currencyControl.invalid"
          >
          </kirby-x-combobox>
        </kirby-form-field>

        <p style="margin-top: 1rem; font-size: 14px;">
          <strong>Form value:</strong> {{ currencyControl.value || '(none)' }}<br>
          <strong>Valid:</strong> {{ currencyControl.valid }}<br>
          <strong>Touched:</strong> {{ currencyControl.touched }}
        </p>
      </form>
    `,
  }),
};
