# Localization and formatting

## Preserve the application's integration

First inspect existing application translation and locale providers, including any localization
extension. Preserve them in established consumers; the locale configuration below is an
initial-setup example, not an instruction to replace a platform-provided locale or runtime
language-switching integration.

Use the consuming application's existing translation service, pipes and key namespaces, including
any domain wrapper around them. Reuse its loading and runtime language-switching behavior.
Translate labels, validation messages, modal titles/actions, accessible names and notifications;
literal strings in bundled examples illustrate component structure only.

Keep three concerns distinct:

1. Application-owned text belongs to the application's translation system.
2. Kirby-owned control labels follow Kirby's locale/translation setup.
3. Amount, account, date and time display follows the application's existing formatting utilities.

## Kirby locale

The Cookbook documents `en-US`, `en-GB`, `de` and `da`. Configure the app's chosen locale through
Angular's `LOCALE_ID` and register its locale data. This influences Kirby date/number formatting
and internal translated labels, including accessible names.

Adapted to standalone configuration from the Cookbook's
[localization example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/localization/localization.component.ts):

```ts
import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';

registerLocaleData(localeDa);

export const appConfig: ApplicationConfig = {
  providers: [{ provide: LOCALE_ID, useValue: 'da' }],
};
```

Merge the provider into the actual application configuration rather than replacing existing
providers. The recipe chooses Danish only as an example; obtain the app's intended locale.
The Cookbook's English demo uses `en` despite listing `en-US`/`en-GB`; use the documented explicit
locale matching the app and verify its installed translations.

## Kirby-owned labels

For custom UI that needs a Kirby-owned label, the documented service is:

```ts
import { inject } from '@angular/core';
import { TranslationService } from '@kirbydesign/designsystem/shared';
```

```ts
private readonly translationService = inject(TranslationService);

get previousMonthLabel(): string {
  return this.translationService.get('previousMonth');
}
```

Kirby's internal translations are not a replacement for translating the app. Before adding
runtime locale switching, inspect the app's existing mechanism and verify whether affected
Kirby components react to it.

Source:
[localization guidance](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/localization/localization.component.html).

## Domain formatting

If installed, `@kirbydesign/extensions-angular/localization` supplies formatting utilities and its
own configuration. Reuse the project's configured providers and helpers; do not assume setting
`LOCALE_ID` also supplies its currency/timezone configuration or application translations.

Keep domain values separate from formatted display values. Preserve the existing form control,
parser, validator and submission contract when adding a mask or formatter. Ask before changing
currency, precision, date-only versus timestamp, or timezone semantics. A localized display string
is not automatically the API's data format.
