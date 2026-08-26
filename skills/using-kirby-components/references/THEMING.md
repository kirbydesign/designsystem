# Kirby Theming & Styling

Kirby's styles are authored in `@kirbydesign/core` and surfaced through
`@kirbydesign/designsystem/scss/*` entry points.

## Global styles (once, in styles.scss)

```scss
@use '@kirbydesign/designsystem/scss/global-styles'; // base styles, typography, tokens, light theme
@use '@kirbydesign/designsystem/scss/print'; // optional generic print styles
```

`global-styles` sets `--kirby-*` CSS custom properties on `:root, :host` and applies the
light theme.

## Sass utilities (per component .scss that needs them)

```scss
@use '@kirbydesign/designsystem/scss/utils' as kirby;
```

Provides functions/mixins for colors, fonts, breakpoints (`include-media`), design tokens,
and `line-clamp`. Use in any component stylesheet that needs Kirby helpers.

## Theming via CSS custom properties

Override `--kirby-*` variables in your styles to theme. Examples of available variables:

- Layout: `--kirby-page-max-width` (default `1366px`), `--kirby-tab-bar-height` (`50px`),
  `--kirby-safe-area-*`, `--kirby-statusbar-padding`.
- Typography: `--kirby-font-family`.
- Colors: `--kirby-white`, `--kirby-black`, and semantic/component tokens like
  `--kirby-modal-background`, `--kirby-button-color`.
- Spacing scale: `--kirby-spacing-xxxs` … (design-token spacing variables).

```scss
:root {
  --kirby-page-max-width: 1024px;
  --kirby-font-family: 'Inter', sans-serif;
}
```

## Design tokens in TypeScript

`@kirbydesign/designsystem/helpers` re-exports token helpers from core:
`DesignTokenHelper`, `ThemeColorDefinition`, `ThemeColorExtended`, `ThemeColorVariant`,
`ThemeColor`, `PlatformService`, plus color/string utilities. Use these when you need
token values in TS (e.g. dynamic chart colors) rather than CSS.

`@kirbydesign/designsystem/helpers/scss` exposes SCSS-derived helper values in TS.
