import { Component, Input, LOCALE_ID } from '@angular/core';
import localeData from '@angular/common/locales/da';
import { registerLocaleData } from '@angular/common';
import {
  Amount,
  AmountPipe,
  AmountService,
  KIRBY_EXTENSIONS_LOCALIZATION_TOKEN,
} from '@kirbydesign/extensions-angular/localization';

import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { type AmountServiceConfiguration } from 'libs/extensions/angular/dist/localization/amount';

registerLocaleData(localeData);

@Component({
  template: `
    {{ amount | amount: amountServiceConfiguration }}
  `,
  selector: 'extensions-amount-example',
  standalone: true,
  imports: [AmountPipe],
})
class AmountExampleComponent {
  @Input() amount!: Amount;
  @Input() amountServiceConfiguration!: AmountServiceConfiguration;
}

/**
 * Pipe that formats an `Amount` to a common format.
 */
const meta: Meta<AmountExampleComponent> = {
  component: AmountExampleComponent,
  title: 'Pipes/Localization/Amount',
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
            locale: 'da',
          },
        },
      ],
    }),
  ],
  tags: ['!autodocs', 'dev'],
};

export default meta;
type Story = StoryObj<AmountExampleComponent>;

/**
 * TODO: Amount DKK docs goes here.
 */
export const AmountDKK: Story = {
  args: {
    amount: { amount: 123456, currencyCode: 'DKK' },
    amountServiceConfiguration: {
      showCurrencyCode: 'alwaysShowCurrency',
    },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ { amount: 123456, currencyCode: 'DKK' } | amount: { showCurrencyCode: 'alwaysShowCurrency' } }}
        </p> `,
      },
    },
  },
};

/**
 * TODO: Amount USD docs goes here.
 */
export const AmountUSD: Story = {
  args: {
    amount: { amount: 123456, currencyCode: 'USD' },
    amountServiceConfiguration: {
      showCurrencyCode: 'alwaysShowCurrency',
    },
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx', // Using tsx here to get better syntax highlighting
        code: `<p>
          {{ { amount: 123456, currencyCode: 'USD' } | amount: { showCurrencyCode: 'alwaysShowCurrency' } }}
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
            locale: 'en',
          },
        },
      ],
    }),
  ],
};
