---
name: using-kirby-components
description: Use @kirbydesign components in a consumer Angular app — install, bootstrap with provideKirby, import standalone components, register icons, theme with SCSS/CSS variables, and set up tests. Use when building an Angular app with Kirby Design System, when you see imports from @kirbydesign/designsystem or @kirbydesign/extensions-angular, or when the user mentions Kirby components, kirby-* selectors, provideKirby, or KirbyTestingModule.
---

# Using Kirby Components

For building **consumer Angular apps** with Kirby — not for developing the Kirby monorepo itself.

## Packages

Consumers install `@kirbydesign/designsystem` (primary). `@kirbydesign/core` is a peer
dependency (SCSS + primitives) installed alongside it. `@kirbydesign/extensions-angular`
is optional and adds higher-level features. Dependency chain: `extensions-angular → designsystem → core`.

```bash
npm i @kirbydesign/designsystem @kirbydesign/core
# optional extras (combobox, sidebar-menu, localization, etc.)
npm i @kirbydesign/extensions-angular
```

## Quick start

1. **Bootstrap** — `withGlobalSetup()` must be called exactly once at app root:

   ```ts
   // main.ts
   import { bootstrapApplication } from '@angular/platform-browser';
   import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem/config';

   bootstrapApplication(AppComponent, {
     providers: [provideKirby(withGlobalSetup({ focusManager: true, setHtmlDocTitle: true }))],
   });
   ```

   Micro-frontends: the host calls `withGlobalSetup()`; each child context calls `provideKirby()` alone.

2. **Use components** — they are standalone; import each from its **secondary entry point**
   into a component's `imports`:

   ```ts
   import { CardComponent } from '@kirbydesign/designsystem/card';
   import { ButtonComponent } from '@kirbydesign/designsystem/button';
   import { IconComponent } from '@kirbydesign/designsystem/icon';

   @Component({
     imports: [CardComponent, ButtonComponent, IconComponent],
     template: `
       <kirby-card>
         <button kirby-button (click)="save()">
           <kirby-icon name="save"></kirby-icon> Save
         </button>
       </kirby-card>`,
   })
   ```

Global styles, print styles, and icon SVG assets are usually already scaffolded in a
consumer app (and the setup snippets live in the package readme). Only revisit them if
styles or icons are actually missing — see [references/THEMING.md](references/THEMING.md)
and [references/ICONS.md](references/ICONS.md).

## Import rules

- **Always import from secondary entry points** (`@kirbydesign/designsystem/card`,
  `.../button`, `.../icon`). Never import from the top-level barrel
  `@kirbydesign/designsystem`.
- **Import individual components and small modules — never `KirbyModule`.** The umbrella
  module pulls in everything and defeats tree-shaking.
- `kirby-button` is an **attribute selector** on native `<button>`/`<a>`, not an element:
  `<button kirby-button>` / `<a kirby-button>`.

See [references/COMPONENTS.md](references/COMPONENTS.md) for the full selector → symbol map.

## Modals

Prefer the declarative `kirby-modal` component (from `@kirbydesign/designsystem/modal`).
Only reach for `ModalController` when you genuinely need imperative control — e.g. opening
a modal from a service, or when the trigger isn't tied to a template. See
[references/COMPONENTS.md](references/COMPONENTS.md#overlays).

## Icons, theming, testing, extensions

- **Icons** (register custom icons, relocate built-ins): [references/ICONS.md](references/ICONS.md)
- **Theming / SCSS / CSS variables**: [references/THEMING.md](references/THEMING.md)
- **Unit testing** (`KirbyTestingModule`): [references/TESTING.md](references/TESTING.md)
- **extensions-angular** (combobox, sidebar-menu, localization, etc.): [references/EXTENSIONS.md](references/EXTENSIONS.md)

## Verify against source

When unsure about a selector, input, or export, don't guess — check the installed package
(`node_modules/@kirbydesign/designsystem/<subpath>`) or the official cookbook at
https://cookbook.kirby.design.
