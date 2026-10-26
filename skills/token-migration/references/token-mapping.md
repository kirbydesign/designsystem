# Legacy → new token mapping

Old palette tokens describe a **color** (`--kirby-white`). New tokens describe a **role on a surface** (`--kirby-color-fill-raised`). The same old token can map to different new tokens, so first decide the role, then pick the token.

## Token anatomy

```
--kirby-color-{property}-{role}[-{emphasis}][-{state}]
  property: fill | content | border
  role:     base | raised | brand | engaged | neutral | success | warning | danger
            (content only: positive | negative)
  emphasis: loud | (default) | quiet | silent (border only)
  state:    hover | active
```

- `base` = the surface itself. `raised` = a control lifted above the surface (input, checkbox box, avatar, tab bar). `brand` = brand-colored emphasis. `engaged` = checked/selected form state.
- Every value is redefined inside `.kirby-surface-base|raised|brand`, so `fill-base` always means "the color of the surface I sit on". Never hardcode which surface you are on.
- Pair properties: if you set `fill-X`, use `content-X` for its text and `border-X` for its border, with the same emphasis and state.
- Full list: `node_modules/@kirbydesign/core/src/scss/themes/default-brand.css`.

## Backgrounds (fill)

| Legacy                                                                        | New                                                        | When                                                                 |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| `--kirby-background-color`                                                    | `fill-base`                                                | page/modal/section background                                        |
| `--kirby-white`                                                               | `fill-base`                                                | container that _is_ the surface (card body, list row)                |
| `--kirby-white`, `--kirby-light`, `--kirby-inputs-background-color`           | `fill-raised`                                              | control placed on a surface (input, chip, badge, avatar, footer bar) |
| `--kirby-primary`                                                             | `fill-brand-loud`                                          | primary action, selected nav item, progress/track highlight          |
| `--kirby-secondary`, `--kirby-tertiary`, `--kirby-dark` as an area background | `fill-base` inside `class="kirby-surface-brand"`           | dark brand areas (sidebar, hero) – establish a brand surface instead |
| `--kirby-semi-light`, `--kirby-medium` as background                          | `fill-neutral`                                             | neutral tag/flag/info block                                          |
| `--kirby-black` (selected/checked)                                            | `fill-engaged`                                             | checked checkbox/radio/toggle-like selection                         |
| `--kirby-white-overlay-*`, `--kirby-dark-overlay-*`, `get-state-color(...)`   | `fill-{role}-hover` / `fill-{role}-active`                 | hover/pressed backgrounds                                            |
| `color.mix()`/`rgba()` of a legacy color                                      | `color-mix(in srgb, var(--kirby-color-…) N%, transparent)` | translucent variants                                                 |

## Text and icons (content)

| Legacy                                                                       | New                                         | When                                        |
| ---------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `--kirby-text-color-black`, `--kirby-black`, `--kirby-white-contrast`        | `content-base`                              | text on the surface                         |
| same, inside a raised control                                                | `content-raised`                            | text in inputs, chips, tab bars, avatars    |
| `--kirby-text-color-semi-dark`, `--kirby-semi-dark`, `--kirby-medium` (icon) | `content-base-quiet`                        | secondary text/icons on the surface         |
| same, inside a raised control                                                | `content-raised-quiet`                      | placeholders, labels inside inputs          |
| `--kirby-primary-contrast`, `--kirby-text-color-white` on brand fills        | `content-brand-loud`                        | text on `fill-brand-loud`                   |
| `--kirby-{status}-contrast`                                                  | `content-{status}[-emphasis]`               | matches the emphasis of the fill it sits on |
| `--kirby-text-color-positive` / `-negative`                                  | `content-positive` / `content-negative`     | numbers/trends                              |
| links (`color: inherit`)                                                     | `content-base-loud` (+ `-hover`, `-active`) |                                             |

## Borders and dividers

| Legacy                                                                                   | New                                                 | When                                                    |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| `--kirby-divider-color`, `--kirby-medium` / `--kirby-background-color` used as separator | `border-base-silent`                                | divider lines, toolbar separators, list row separators  |
| `--kirby-medium` as outline/track/table line                                             | `border-base-quiet`                                 | outlined containers, table rows, slider/progress tracks |
| `--kirby-semi-dark` as control border                                                    | `border-raised` (+ `-hover`, `-active`)             | checkbox/radio/input borders                            |
| `--kirby-semi-light` as control outline                                                  | `border-raised-quiet`                               | avatar/chip outline                                     |
| `--kirby-dark` as selected underline                                                     | `border-base-loud`                                  | tab indicator                                           |
| `--kirby-inputs-elevation` (shadow as border)                                            | 1px border `border-raised-quiet` or `border-raised` | elevations on controls were replaced by borders         |
| `--kirby-danger` for an error border                                                     | `border-raised-danger` + error ring                 | see [patterns.md](patterns.md#error-state)              |

## Status colors

Choose the emphasis from **where the color is used**, not from the old suffix:

| Use                                                                        | Emphasis                                                   | Typical legacy  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------- |
| soft message background (toast, flag, notice)                              | `fill-{status}-quiet` + `content-`/`border-{status}-quiet` | `-tint`         |
| large colored container or action (swipe action, destructive button, card) | `fill-{status}` (+ `-hover`/`-active`)                     | plain           |
| small saturated indicator or icon (dot badge, icon, empty state)           | `fill-{status}-loud`                                       | `-shade`, plain |
| stroke (progress ring, outline)                                            | `border-{status}-loud`                                     | plain, `-shade` |

`{status}` is `success`, `warning` or `danger`.

## Focus

| Legacy                            | New                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `--kirby-focus-ring-color`        | `--kirby-color-border-focus` (prefer a ring variable below)                           |
| `--kirby-white` as focus-ring gap | `--kirby-color-border-offset`                                                         |
| custom focus `box-shadow`         | `--kirby-focus-ring-{sm-inset,sm-combined-inset,md-inset,md-combined-inset,md-outer}` |

## Input theme variables

The old theming system (`--kirby-inputs-*`, `--kirby-divider-color`) is still emitted, but no Kirby component reads it any more. Migrate every use.

**Reading** them (`var(--kirby-inputs-…)`) – replace:

| Legacy                                      | New                                                               |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `--kirby-inputs-background-color`           | `fill-raised`                                                     |
| `--kirby-inputs-background-color-hover`     | `fill-raised-hover`                                               |
| `--kirby-inputs-background-color-active`    | `fill-raised-active`                                              |
| `--kirby-inputs-color`                      | `content-raised`                                                  |
| `--kirby-inputs-placeholder-color`          | `content-raised-quiet`                                            |
| `--kirby-inputs-indicator-background-color` | `fill-brand`                                                      |
| `--kirby-inputs-indicator-color`            | `content-brand`                                                   |
| `--kirby-inputs-color-hover`                | ask – Kirby dropped it (the hover keeps the text color)           |
| `--kirby-inputs-elevation`                  | 1px border `border-raised` / `border-raised-quiet`, no shadow     |
| `--kirby-divider-color`                     | `border-base-silent` (dividers) or `border-base-quiet` (outlines) |

When the custom element is used on a non-default surface (e.g. a sidebar menu on brand), the `-base` variants may fit better than `-raised` – Kirby's sidebar uses `fill-base-hover`/`-active` for menu item states.

**Assigning** them (`--kirby-inputs-background-color: …`, also `themes.apply-dark-theme`) – this restyled Kirby inputs before, and now has **no effect**. Find the intent:

- inputs on a dark/brand area → put `kirby-surface-brand` (or `-raised`/`-base`) on the container and delete the assignments
- custom input colors → ask the user; there is no replacement hook on the inputs themselves
- the variable is also read by the consumer's own code → migrate those reads (table above), then delete the assignment

## No-brainers

These replacements hold in every context, so apply them without asking. The scanner shows them as `⇒ var(--kirby-color-…)`.

| Legacy value                                                           | Assigned to           | New                              |
| ---------------------------------------------------------------------- | --------------------- | -------------------------------- |
| `--kirby-text-color-black`, `get-text-color('black')`                  | anything              | `content-base`                   |
| `--kirby-text-color-positive` / `-negative`                            | anything              | `content-positive` / `-negative` |
| `--kirby-primary-contrast`                                             | anything              | `content-brand-loud`             |
| `--kirby-focus-ring-color`, `#238cec`                                  | anything              | `border-focus`                   |
| `--kirby-inputs-*` (the mapped rows above)                             | anything              | see table above                  |
| `--kirby-background-color`, `get-color('background-color')`, `#f6f6f6` | a background property | `fill-base`                      |
| `--kirby-primary`, `get-color('primary')`, `#00e89a`                   | a background property | `fill-brand-loud`                |
| `--kirby-{success,warning,danger}-tint`                                | a background property | `fill-{status}-quiet`            |
| `#1c1c1c`                                                              | a text color property | `content-base`                   |

"Background property" means `background*`, `fill` or a variable whose name contains `background`/`bg`/`fill`. Everything else in this file depends on context.

## Component variable overrides

Kirby components expose variables such as `--kirby-card-main-background-color`, `--kirby-button-color` or `--kirby-flag-border-color`. Overriding them is a supported customization – **keep the override**, including custom colors (`--kirby-card-main-background-color: #ff00aa` is fine and not reported).

Only the _value_ is migrated:

- legacy value with a no-brainer (table above) → replace the value
- legacy value without one (e.g. `--kirby-card-main-color: var(--kirby-white-contrast)`) → ask the user which token to use, or leave it with a `TODO(design-tokens)`
- override that now equals Kirby's default → ask whether to remove it

Before keeping an override, check that the component still reads the variable: search for it in `node_modules/@kirbydesign/designsystem/fesm2022/kirbydesign-designsystem-<component>.mjs` (styles are inlined there). If it is not found, the override is dead – tell the user.

## No direct replacement – ask the user

- `--kirby-decoration-color-*` (illustrative palette): ask which role it plays, or keep it as is with a `TODO`.
- `--kirby-{secondary,tertiary}` used as accent color (not as an area background).
- Status colors used decoratively (e.g. `--kirby-success` as a chart line).
- `--kirby-text-color-danger` (red text): `content-negative` fits values; for form errors prefer Kirby's form-field error state.
- `DesignTokenHelper.getColor()` / `ColorHelper` in TypeScript.

## Unchanged

Spacing, font size/weight, line height, border radius, elevation, z-index, transition and page-width tokens (`--kirby-spacing-*`, `--kirby-font-*`, `--kirby-border-radius-*`, `--kirby-elevation-*`, `--kirby-z-index-*` …) keep their names. Leave them alone.
