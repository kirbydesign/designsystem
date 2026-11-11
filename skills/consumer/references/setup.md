# Setup

## Existing application first

Check how the app already loads Kirby global styles, themes, fonts, icons and root providers.
Per-component Angular imports alone do not install global styling or configure an application.
Preserve the existing shell, router and bootstrap approach.

For initial setup or missing prerequisites, use the installed version's package documentation and
the [Kirby README](https://github.com/kirbydesign/designsystem/blob/develop/README.md).
The Cookbook intro describes the system but is not a complete installation guide. Verify required
packages and providers before changing bootstrap; do not copy the Cookbook application's own
infrastructure into a corporate microfrontend.

### Kirby providers in a hosted microfrontend

When supported by the installed version, each Angular microfrontend context uses `provideKirby()`
from `@kirbydesign/designsystem/config`. Merge it into the existing provider configuration:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideKirby } from '@kirbydesign/designsystem/config';

export const appConfig: ApplicationConfig = {
  providers: [provideKirby()],
};
```

The host calls `provideKirby(withGlobalSetup())` once for global browser setup; an embedded
microfrontend should not repeat `withGlobalSetup()` to fix a local rendering/provider issue.
Preserve the platform's bootstrap function and any existing local Kirby configuration.

Sources:
[provider setup](https://github.com/kirbydesign/designsystem/blob/develop/README.md#provide-kirby),
[provider implementation](https://github.com/kirbydesign/designsystem/blob/develop/libs/designsystem/config/src/provide-kirby.ts).
