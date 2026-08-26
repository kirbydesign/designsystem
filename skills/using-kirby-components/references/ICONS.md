# Kirby Icons

Import path: `@kirbydesign/designsystem/icon` (also re-exported from the barrel).

## Using the Icon component

```ts
import { IconComponent } from '@kirbydesign/designsystem/icon';
// template: <kirby-icon name="save" size="md"></kirby-icon>
```

- `name: string` — icon id (default `'cog'`).
- `size: IconSize` — `'xs' | 'sm' | 'md' | 'lg'` (`IconSize` enum: `XS`, `SM`, `MD`, `LG`).

## Required asset setup

Kirby ships SVGs that must be copied to the app output. In `angular.json` build assets:

```json
{
  "glob": "**/*.svg",
  "input": "node_modules/@kirbydesign/designsystem/icons/svg",
  "output": "./assets/kirby/icons/svg"
}
```

Built-in icons load from `assets/kirby/icons/svg/` by default (`DEFAULT_BUILT_IN_ICONS_URL`).

## Registering custom icons

Use `IconRegistryService` (root-provided) in an app initializer:

```ts
import { provideAppInitializer, inject } from '@angular/core';
import { IconRegistryService, Icon } from '@kirbydesign/designsystem/icon';

provideAppInitializer(() => {
  const registry = inject(IconRegistryService);
  registry.addIcons([
    { name: 'football', svg: 'assets/icons/football.svg' },
    { name: 'tennis', svg: 'assets/icons/tennis.svg' },
  ]);
});
```

`IconRegistryService` methods: `addIcon(name, svgPath)`, `addIcons(icons: Icon[])`,
`getIcon(name)`, `getIcons()`. `Icon` = `{ name: string; svg?: string }`.
`IconSettings` = `{ icons: Icon[] }`.

## Relocating built-in icons

Override the base URL (e.g. serve icons from a CDN):

```ts
import { BUILT_IN_ICONS_URL } from '@kirbydesign/designsystem/icon';

providers: [
  { provide: BUILT_IN_ICONS_URL, useValue: 'https://example.org/1.0.1/kirby/icons/svg/' },
];
```
