# Migration patterns

Consumer import path for mixins: `@use '@kirbydesign/designsystem/scss/utils';`

## Surfaces

A surface is a global class: `kirby-surface-base`, `kirby-surface-raised` or `kirby-surface-brand`. `:root` is a base surface. Each class redefines every `--kirby-color-*` token, so descendants adapt automatically.

| Surface | Use for                                           | Kirby examples                                     |
| ------- | ------------------------------------------------- | -------------------------------------------------- |
| base    | areas that match the page background              | page, item, accordion, `kirby-card variant="base"` |
| raised  | areas lifted from the background by fill + border | default card, list, page footer, tab bar           |
| brand   | most prominent, dark branded areas                | `kirby-card variant="brand"`, sidebar              |

**A container that establishes a surface styles itself with `-base` tokens** – inside a surface, "base" means that surface's own background:

```html
<section class="promo kirby-surface-brand">…</section>
```

```scss
.promo {
  background-color: var(--kirby-color-fill-base);
  color: var(--kirby-color-content-base);
  border: 1px solid var(--kirby-color-border-base-quiet);
}
```

For an Angular component that is itself a surface: `@HostBinding('class.kirby-surface-raised') readonly raised = true;`. Prefer wrapping in `<kirby-card variant="…">` when the container is card-like.

**Leaf controls do not set a surface class.** They use `-raised` tokens (input, chip, avatar) or `-brand-loud` (primary emphasis) and resolve against whatever surface they sit on.

Replace legacy dark-context handling (`themes.apply-dark-theme`, `:host-context(.kirby-color-brightness-dark)`, `$make-lighter`) with a `kirby-surface-brand` class on the container.

**Resolve tokens where they are used.** A custom property such as `--my-bg: var(--kirby-color-fill-base)` resolves on the element that declares it. Declare it on the element (or `:host`) inside the surface, not on a page-level ancestor.

### Color inputs on custom components

If a custom component has a `themeColor`/`color` input:

- surface-like values → surface class: `light` → base, `white` → raised, `primary`/`secondary`/`tertiary`/`dark` → brand
- `success`/`warning`/`danger` → status tokens with an explicit emphasis (see token-mapping.md), fill + content + border together
- `medium`/`semi-light` → `neutral` (no hover/active variants exist)
- overlay values (`white-overlay`, `dark-overlay`) have no equivalent: ask the user whether to drop them

## Hover and active

The `interaction-state` layer mixins drew a translucent overlay. Now each state sets explicit `-hover`/`-active` tokens.

```scss
// Before
@use '@kirbydesign/core/src/scss/interaction-state';
.tile {
  @include interaction-state.initialize-layer;
  @include interaction-state.apply-hover('xxxs');
  @include interaction-state.apply-active('xxs');
}
```

```scss
// After
@use '@kirbydesign/designsystem/scss/utils';
.tile {
  --tile-fill: var(--kirby-color-fill-raised);
  --tile-content: var(--kirby-color-content-raised);
  --tile-border: var(--kirby-color-border-raised-quiet);
  background-color: var(--tile-fill);
  color: var(--tile-content);
  border: 1px solid var(--tile-border);

  @include utils.hover {
    --tile-fill: var(--kirby-color-fill-raised-hover);
    --tile-content: var(--kirby-color-content-raised-hover);
    --tile-border: var(--kirby-color-border-raised-quiet-hover);
  }

  &:active {
    --tile-fill: var(--kirby-color-fill-raised-active);
    --tile-content: var(--kirby-color-content-raised-active);
    --tile-border: var(--kirby-color-border-raised-quiet-active);
  }
}
```

- Use the `-hover`/`-active` variant of the _same_ token (same property, role and emphasis).
- Remove `.state-layer`/`.content-layer` wrapper markup and any selectors targeting them, including inside Kirby components (button and card no longer render them).
- Parent styled from a child's state: `@media (hover: hover) { :host:has(.header:hover) { … } }` and `:host:has(.header:active) { … }`.
- Ionic elements: set `--background-hover`, `--color-hover`, `--background-focused` with `--background-hover-opacity: 1`, and use `&.ion-activated` for active.
- `interaction-state.transition()` is still fine for transitions.

## Focus

| Variable                                    | Use                                                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--kirby-focus-ring-md-combined-inset`      | bordered elements (cards, buttons, inputs) – also set `border-color: var(--kirby-color-border-focus)` |
| `--kirby-focus-ring-sm-combined-inset`      | compact bordered elements (checkbox-like) – also set the border color                                 |
| `--kirby-focus-ring-md-inset` / `-sm-inset` | elements without a border                                                                             |
| `--kirby-focus-ring-md-outer`               | inline text, links                                                                                    |

```scss
&:focus-visible {
  border-color: var(--kirby-color-border-focus);
  box-shadow: var(--kirby-focus-ring-md-combined-inset);
}
```

Don't combine the ring with an elevation shadow. `--kirby-focus-ring-color` no longer exists – this is a breaking change, not a deprecation.

## Error state

```scss
&.error {
  border-color: var(--kirby-color-border-raised-danger);
  box-shadow: var(--kirby-error-ring-combined-inset);
}
```

Order rules **default → hover → active → error → focus-visible**, so the error border wins over hover/active and focus wins over everything. Hide the error decoration while a popover owns focus (e.g. an open dropdown).

## Disabled state

Disabled colors are replaced by opacity. Keep the enabled tokens:

```scss
&:disabled,
&[aria-disabled='true'] {
  pointer-events: none;
  opacity: 0.4; // TODO(@design-tokens) needs token
}
```

There is no disabled token or opacity variable yet – keep the `TODO` so it is easy to find later.

## Elevation, borders and color math

- Resting elements get a 1px quiet border instead of `--kirby-elevation-*`. Keep elevation for floating things (popovers, modals, FABs). Compensate size with `box-sizing: border-box`, `calc(padding - 1px)` or `outline` with `outline-offset: -1px`.
- Tokens are runtime values, so Sass color math on them can't work. Replace `rgba(get-color(…))`, `color.mix()` and `color.adjust()` with `color-mix(in srgb, var(--kirby-color-…) 50%, transparent)`.
- Overlays (modals, popovers) render at the app root, on the base surface.

## Backwards compatibility

Legacy tokens are still emitted, so the app keeps working while components are migrated one at a time. Don't mix legacy and new color tokens inside one component – migrate it fully. Kirby's stylelint rule `kirby/use-design-tokens` autofixes `get-color()` to _legacy_ tokens; don't rely on its autofix for this migration.
