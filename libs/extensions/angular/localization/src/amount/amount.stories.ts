import { Component, Input, LOCALE_ID } from '@angular/core';
import localeData from '@angular/common/locales/da';
import { registerLocaleData } from '@angular/common';
import {
  Amount,
  AmountPipe,
  AmountService,
  AmountServiceConfiguration,
  KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
} from '@kirbydesign/extensions-angular/localization';

import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

registerLocaleData(localeData);

@Component({
  template: `
    {{ myAmount | amount: amountServiceConfiguration }}
  `,
  selector: 'extensions-amount-example',
  standalone: true,
  imports: [AmountPipe],
})
class AmountExampleComponent {
  /**
   * Name of pipe to use in the template.
   */
  @Input() amount!: AmountPipe;

  /**
   * An example `Amount` to be formatted.
   */
  @Input() myAmount!: Amount;

  /**
   * Configuration object for the Amount Pipe. The configuration object can be used to control
   * the formatting of the amount, and can be passed as an argument to the Amount Pipe when used on an `Amount`.
   */
  @Input() amountServiceConfiguration?: AmountServiceConfiguration;
}

/**
 * 
 * The Amount Pipe formats an `Amount` to a common format.
 *
 * The `AmountServiceConfiguration` object can be used to control
 * the formatting of the amount, and can be passed as an argument to the amount-pipe when used on an `Amount`.

 * - `showCurrencyCode`: Controls whether the currency code should be displayed or not.
 *   - `''`: Don't output currency code
 *   - `'alwaysShowCurrency'`: Always show currency code, regardless of presentation currency
 *   - `'showForeignCurrency'`: Only show currency code if it differs from the presentation currency
 *   - `'useCurrencyMapping'`: - Shows the currency symbol defined in `KirbyExtensionsLocalizationToken.currencyMappings` instead of the currency code. Fallback to currencyCode
 * - `digitsInfo`: A string that represents the format of the number. Learn more about the format here: https://angular.dev/api/common/DecimalPipe?tab=usage-notes
 *  - `stripSign`: Controls whether the minus sign should be stripped from a negative amount.
 * - `currencyCodePosition`: Controls the position of the currency code in the formatted amount.
 *   - `'postfix'`: Output currency code after the formatted amount, e.g. 1.234,56 EUR
 *   - `'prefix'`: Output currency code before the formatted amount, e.g. DKK 1.234,56
 * 
 * ---
 */
const meta: Meta<AmountExampleComponent> = {
  component: AmountExampleComponent,
  title: 'Pipes/Localization/Formatting',
  decorators: [
    moduleMetadata({
      imports: [AmountPipe],
      providers: [
        AmountService,
        { provide: LOCALE_ID, useValue: 'da' },
        {
          provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
          useValue: {
            nativeCurrency: 'DKK',
          },
        },
      ],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    myAmount: { amount: 123456, currencyCode: '' },
    amountServiceConfiguration: {
      showCurrencyCode: 'alwaysShowCurrency',
      digitsInfo: '1.2-2',
      stripSign: false,
      currencyCodePosition: 'postfix',
    },
  },
  argTypes: {
    amount: { control: false },
  },
};

export default meta;
type Story = StoryObj<AmountExampleComponent>;

/**
 * In the following example, the amount is formatted with the Danish currency code DKK, and the currency code is always shown.
 * The `LOCALE_ID` of the example is `da`, so the amount is formatted with a comma as the decimal separator and a period as the thousand separator.
 */
export const AmountDKK: Story = {
  args: {
    myAmount: { amount: 123456, currencyCode: 'DKK' },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ myAmount /* e.g. { amount: 123456, currencyCode: 'DKK' } */ | amount: amountServiceConfiguration }}
        </p> `,
      },
    },
  },
  argTypes: {
    myAmount: {
      control: {
        type: 'object',
      },
    },
  },
};

/**
 * Here the amount is formatted with a custom currency symbol kr. instead of the currency code DKK
 */
export const AmountCurrentMapping: Story = {
  args: {
    myAmount: { amount: 123456, currencyCode: 'DKK' },
    amountServiceConfiguration: {
      showCurrencyCode: 'useCurrencyMapping',
      currencyCodePosition: 'postfix',
    },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ myAmount /* e.g. { amount: 123456, currencyCode: 'DKK' } */ | amount: {
        showCurrencyCode: 'useCurrencyMapping',
        currencyCodePosition: 'postfix',
      } 
      }}
        </p> `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: LOCALE_ID, useValue: 'da' },
        {
          provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
          useValue: {
            nativeCurrency: 'DKK',
            currencyMappings: { DKK: 'kr.' },
          },
        },
      ],
    }),
  ],
};

/**
 * Here the amount is formatted with the US currency code USD, and the currency code is always shown.
 * The `LOCALE_ID` of the example is `en`, so the amount is formatted with a period as the decimal separator and a comma as the thousand separator.
 */
export const AmountUSD: Story = {
  args: {
    myAmount: { amount: 123456, currencyCode: 'USD' },
    amountServiceConfiguration: {
      showCurrencyCode: 'alwaysShowCurrency',
      digitsInfo: '1.2-2',
      stripSign: false,
      currencyCodePosition: 'prefix',
    },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ myAmount /* e.g. { amount: 123456, currencyCode: 'USD' } */ | amount: {
      showCurrencyCode: 'alwaysShowCurrency',
      digitsInfo: '1.2-2',
      stripSign: false,
      currencyCodePosition: 'prefix',
    } 
    }}
        </p> `,
      },
    },
  },
  decorators: [
    moduleMetadata({
      providers: [
        { provide: LOCALE_ID, useValue: 'en' },
        {
          provide: KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
          useValue: {
            nativeCurrency: 'USD',
          },
        },
      ],
    }),
  ],
};
