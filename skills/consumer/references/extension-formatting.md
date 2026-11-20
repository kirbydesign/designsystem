# Extension formatting

Import these standalone pipes from `@kirbydesign/extensions-angular/localization`.
Use the existing locale and extension-formatting configuration; missing configuration is a setup
prerequisite, not a reason to add feature-local providers.

## Choose the formatter

| Display                    | Pipe                                  | Input and behavior                                                                                                                           |
| -------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Monetary amount            | `AmountPipe` / `amount`               | `Amount`: `{ amount: number, currencyCode: string }`; options use `AmountServiceConfiguration`.                                              |
| Number                     | `FormatNumberPipe` / `formatNumber`   | Number and optional `digitsInfo` **string**, default `'1.2-2'`.                                                                              |
| Date from a timestamp      | `DateOnlyPipe` / `dateOnly`           | Number, `Date` or date string; displays the date in the configured timezone.                                                                 |
| Time from a timestamp      | `TimeOnlyPipe` / `timeOnly`           | Same timestamp inputs; `'short'` shows hours/minutes, `'medium'` adds seconds.                                                               |
| Time today, date otherwise | `TimeOrDatePipe` / `timeOrDate`       | Optional `showSeconds` and `'month-as-digits' \| 'month-as-letters'`.                                                                        |
| Account number             | `AccountNumberPipe` / `accountNumber` | `AccountNumber`: `{ regNo: string, accountNo: string }`; pads registration to four characters and removes leading account zeros for display. |
| Phone number               | `PhoneNumberPipe` / `phoneNumber`     | Digit-only string or `PhoneNumber`: `{ countryCode: string, number: string }`; optional chunk size and country-code visibility.              |

## Pipe example

The values illustrate payload shapes, not application currency or timezone defaults.

```ts
import { Component } from '@angular/core';
import {
  AccountNumber,
  AccountNumberPipe,
  Amount,
  AmountPipe,
  AmountServiceConfiguration,
  DateOnlyPipe,
  FormatNumberPipe,
  PhoneNumber,
  PhoneNumberPipe,
  TimeOnlyPipe,
  TimeOrDatePipe,
} from '@kirbydesign/extensions-angular/localization';

@Component({
  selector: 'app-formatted-summary',
  standalone: true,
  imports: [
    AmountPipe,
    FormatNumberPipe,
    DateOnlyPipe,
    TimeOnlyPipe,
    TimeOrDatePipe,
    AccountNumberPipe,
    PhoneNumberPipe,
  ],
  template: `
    <p>{{ balance | amount: amountOptions }}</p>
    <p>{{ count | formatNumber: '1.0-0' }}</p>
    <p>{{ timestamp | dateOnly }}</p>
    <p>{{ timestamp | timeOnly: 'medium' }}</p>
    <p>{{ timestamp | timeOrDate: false : 'month-as-digits' }}</p>
    <p>{{ account | accountNumber }}</p>
    <p>{{ phone | phoneNumber: 2 : true }}</p>
  `,
})
export class FormattedSummaryComponent {
  readonly balance: Amount = { amount: 1234.5, currencyCode: 'EUR' };
  readonly amountOptions: AmountServiceConfiguration = {
    showCurrencyCode: 'alwaysShowCurrency',
    currencyCodePosition: 'postfix',
  };
  readonly count = 1234;
  readonly timestamp = '2026-01-02T12:30:00Z';
  readonly account: AccountNumber = { regNo: '987', accountNo: '0012345678' };
  readonly phone: PhoneNumber = { countryCode: '+45', number: '12345678' };
}
```

## Contracts and alternatives

- Amount options include `showCurrencyCode`, `currencyCodePosition`, `digitsInfo` and `stripSign`.
  Currency display choices are `''`, `'alwaysShowCurrency'`, `'showForeignCurrency'` and
  `'useCurrencyMapping'`. Formatting does not convert currency or validate monetary values.
- Number formatting uses `LOCALE_ID`; amount, date/time and phone formatting also require existing
  extension localization settings. Account formatting uses the supplied strings directly.
- `TimeOrDatePipe` determines "today" using the browser's local calendar, then formats in the
  configured timezone. Verify day-boundary behavior when these zones differ; use an explicit date
  or time display when conditional output would be misleading.
- Phone formatting expects digit-only numbers and a positive chunk size. Invalid characters may
  produce no output; validate domain input independently. Omitting country-code visibility uses
  the configured language/locale policy.
- Keep raw amounts, timestamps, account and phone values unchanged; these are display formatters,
  not parsers.

For formatting outside templates, the same entry point exports `AmountService.formatAmount`,
`FormatNumberService.formatNumber` and `PhoneNumberService.formatPhoneNumber`. It also exports
`formatAmount` and `formatAccountNumber` functions; the amount function takes explicit locale and
extension settings. Prefer existing configured helpers over manually duplicating their rules.
