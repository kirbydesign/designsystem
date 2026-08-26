# @kirbydesign/extensions-angular

Optional package with higher-level, app-oriented features not in designsystem. Peer-depends
on `@kirbydesign/designsystem`. All components use the `kirby-x-` selector prefix.

**Import only via subpaths** — the package root `index.ts` is intentionally empty.

## Features

| Subpath              | Provides                                                                                     | Selector(s)                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/combobox`          | `ComboboxComponent`                                                                          | `kirby-x-combobox`                                                                                                           |
| `/image-banner`      | `ImageBannerComponent`, `ImageBannerHeightDirective`                                         | `kirby-x-image-banner`                                                                                                       |
| `/skeleton-loader`   | `SkeletonLoaderComponent`                                                                    | `kirby-x-skeleton-loader`                                                                                                    |
| `/spot-illustration` | `SpotIllustrationComponent`, `illustrations`, `SpotIllustrationName`, `SpotIllustrationSize` | `kirby-x-spot-illustration`                                                                                                  |
| `/sidebar-menu`      | `SidebarModule` + models                                                                     | `kirby-x-sidebar`, `kirby-x-sidebar-header`, `kirby-x-sidebar-footer`, `kirby-x-sidebar-menu`, `kirby-x-sidebar-menu-loader` |
| `/localization`      | i18n pipes/services (no components)                                                          | —                                                                                                                            |

```ts
import { ComboboxComponent } from '@kirbydesign/extensions-angular/combobox';
```

## spot-illustration assets

Copy SVGs to output (the package's ng-package copies them to `assets/spot-illustrations`).
Ensure your `angular.json` assets include the extensions illustration folder if needed.

## Localization

Pipes/services: `TimeOrDatePipe`, `DateOnlyPipe`, `TimeOnlyPipe`, `FormatNumberPipe`
/`FormatNumberService`, `AmountPipe`/`AmountService`/`formatAmount`, `AccountNumberPipe`
/`formatAccountNumber`, `PhoneNumberPipe`/`PhoneNumberService`.

Configure once via DI with `provideKirbyExtensionsLocalizationToken`:

```ts
import { provideKirbyExtensionsLocalizationToken } from '@kirbydesign/extensions-angular/localization';

providers: [
  provideKirbyExtensionsLocalizationToken(() => ({
    nativeCurrency: 'DKK',
    defaultLang: 'da',
    countryCode: '+45',
    timeZone: 'Europe/Copenhagen',
    // currencyMappings?: ...
  })),
];
```

The config interface (`KirbyExtensionsLocalizationToken`) fields: `nativeCurrency`,
`defaultLang`, `countryCode`, `timeZone`, optional `currencyMappings`. Backed by
`KIRBY_EXTENSIONS_LOCALIZATION_TOKEN`.
