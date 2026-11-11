# Styling

## Choose the styling layer

1. Use the Kirby component's documented inputs, slots and variants.
2. Compose Kirby components with a thin layout wrapper.
3. Use documented public component CSS variables for customization.
4. If custom UI is still necessary, explain the missing capability and obtain agreement before
   recreating a Kirby lookalike.

Use the optional `kirby-custom-component` skill for detailed lookalike and legacy-color migration
work when installed. This consumer skill does not require that companion: without it, verify the
relevant public variables/tokens in the installed package and ask when no documented option fits.

## Tokens

Use the application's configured Kirby global styles and theme. Check actual token names in the
installed package before adding a token; the patterns below are naming aids, not proof every
combination exists.

| Category      | Pattern                       | Common keys                                        |
| ------------- | ----------------------------- | -------------------------------------------------- |
| Spacing       | `--kirby-spacing-{key}`       | `xxxxs xxxs xxs xs s m l xl xxl xxxl xxxxl xxxxxl` |
| Font size     | `--kirby-font-size-{key}`     | `xxs xs s n m l xl xxl xxxl xxxxl`                 |
| Font weight   | `--kirby-font-weight-{key}`   | `light normal medium bold black`                   |
| Line height   | `--kirby-line-height-{key}`   | `xxs xs s n m l xl`                                |
| Border radius | `--kirby-border-radius-{key}` | Inspect the installed scale.                       |
| Elevation     | `--kirby-elevation-{key}`     | Inspect the installed scale.                       |
| Z-index       | `--kirby-z-index-{key}`       | Inspect the installed scale.                       |

```scss
.record-summary {
  display: grid;
  gap: var(--kirby-spacing-s);
  padding: var(--kirby-spacing-m);
}
```

### Version-sensitive colors

Preserve the consumer skill's semantic-color policy for new UI: use
`--kirby-color-{fill|content|border}-{role}[-{emphasis}][-{state}]` with the appropriate
`kirby-surface-base`, `kirby-surface-raised` or `kirby-surface-brand` container. Verify the exact
token and surface class in the installed version, including `@kirbydesign/core` theme files.
Pair fill/content/border by their semantic role rather than picking visually similar primitives.

The Cookbook color page documents legacy palette tokens and `get-color()`. Treat
that as legacy documentation, not permission to migrate new UI back to palette primitives.
If the installed version lacks semantic tokens, report the mismatch and ask for the supported
styling/upgrade policy; leave existing legacy styling unchanged unless migration is requested.
Keep application brand-theme definitions separate from consumer component overrides.

## Responsive layout

### Grid columns

Use `.kirby-grid` and `.kirby-grid-item` for a known column layout at breakpoints. These are CSS
classes and attributes, not an Angular grid component. This fragment stacks full-width columns
at `xs` and splits them at `sm`. Global Kirby styles are required; `data-` prefixed span attributes
are supported.

```html
<div class="kirby-grid">
  <div class="kirby-grid-item" data-xs="12" data-sm="6">First section</div>
  <div class="kirby-grid-item" data-xs="12" data-sm="6">Second section</div>
</div>
```

For CSS-grid page regions, read the selected guide's HTML and SCSS together. The
[documentation index](./documentation-index.md#guides) lists the grid-layout guides and their
implementations. Load only the matching pair and verify the actual narrow and wide layouts.

Source:
[grid](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/grid-showcase/grid-showcase.component.html).

### SCSS media queries

```scss
@use '@kirbydesign/designsystem/scss/utils' as utils;

.record-summary {
  display: grid;
  gap: var(--kirby-spacing-s);

  @include utils.media('>small') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

Documented breakpoints: `xsmall` 320px, `small` 632px, `medium` 768px, `large` 992px,
`xlarge` 1440px. Use SCSS media utilities for media queries; CSS custom properties cannot
be substituted directly into media-query conditions.

## Typography

Keep semantic headings in a logical hierarchy; use utility classes to change their visual size.
Global Kirby styles provide:

`kirby-text-display-1`, `kirby-text-display-2`, `kirby-text-display-3`,
`kirby-text-xlarge` (h1 appearance), `kirby-text-large` (h2), `kirby-text-medium` (h3),
`kirby-text-normal-bold` (h4), `kirby-text-normal` (p), `kirby-text-small`,
`kirby-text-small-light`, `kirby-text-xsmall`, `kirby-text-xxsmall`, `kirby-text-bold`.

```html
<h3 class="kirby-text-large">Record details</h3>
```

Verify responsive wrapping, zoom, contrast on the actual surface, and available tokens.

Sources:
[spacing](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/showcase/spacing-showcase),
[typography](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/showcase/typography-showcase),
[breakpoints](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/showcase/breakpoints-showcase),
[legacy colors](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/showcase/colors-showcase).
