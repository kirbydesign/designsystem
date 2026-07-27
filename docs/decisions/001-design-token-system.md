# ADR-001: Design tokens and surface themes

## Status

Accepted

## Date

2026-09-14

## Context

Kirby's design tokens start as Figma variables and end as CSS custom properties.

This ADR covers two related choices:

- how components get their colours from a surface
- how `@repo/design-tokens` generates the CSS

The generator supports the surface model, but does not contain any knowledge of it.

This ADR replaces several older ADRs. It describes the current system, not every step that led to it.

See [`DESIGN-TOKENS.md`](../../DESIGN-TOKENS.md) for terms. See [`tools/design-tokens/README.md`](../../tools/design-tokens/README.md) for generator setup and usage.

## Decision

### 1. We support three surface contexts

The three surface contexts are `base`, `raised`, and `brand`.

A surface has a fixed appearance. It sets the context inherited by its children, and consumes the base tokens itself. This means that a page background, card, or list does not change based on how deeply it is nested.

A component, such as a button, input, or checkbox, changes its appearance to suit the current context.

It does this by choosing either a prominence (`base`, `raised`, or `brand`) or an intent (`success`, `warning`, `danger`, and so on).

One element must not both change its appearance for a context and create a new context. Allowing both would result in an unlimited set of nesting levels needing to be designed and supported.

### 2. The selector holds the context

Colour tokens themselves do not include the surface context:

`--kirby-color-<role>-<prominence|intent>-<loudness>-<state>`

Each surface assigns values to the same set of variables under its own selector:

- `.kirby-surface-base`, also set on `:root`
- `.kirby-surface-raised`
- `.kirby-surface-brand`

Components only read the variables based on their prominence, and the CSS cascade gives them the values for their current surface. Thus, components need no knowledge of the current context they live in.

Each surface defines every variable in the contract. It does not define only the values that differ from `base`.

This prevents a component from accidentally inheriting a value from another surface when surfaces are nested or the component appears in an unexpected place.

The generator warns when blocks written to the same file define different sets of variables. A missing variable would otherwise inherit a value from another surface. This warning usually finds Figma typos.

### 3. There are two token levels

| Level     | Names                                                                     | Selector                   |
| --------- | ------------------------------------------------------------------------- | -------------------------- |
| Primitive | `--kirby-{system,brand}-color-*`, `--kirby-{spacing,border-radius,...}-*` | `:root`                    |
| Semantic  | `--kirby-color-*`, `--kirby-<component>-color-*`, `--kirby-elevation-*`   | `.kirby-surface-<surface>` |

There is no third level scoped to a component class.

Names such as `--kirby-spot-color-fill` are semantic tokens with a component name in them. Each surface assigns them like any other semantic token.

A true component-class level would make every component track its context. Section 1 rejects that design.

Every variable starts with `--kirby-`.

Older drafts used `--kirby-theme-` for semantic tokens. We removed `theme` because `--kirby-` is already unique enough and the extra word added no value.

### 4. The generator has no Kirby-specific token rules

The generator does one job:

1. Read a tree of values.
2. Check each value against an ordered list of rules.
3. Use the first matching rule to choose the variable name, selector, and output file.

The code knows nothing about surfaces, token levels, categories, or allowed collections.

All of that lives in `design-tokens.config.mjs`. This includes surface names, Figma's `" surface"` suffix, selectors, units, and the variable prefix.

Changing the theme model is a config change. The generator can also be reused for another design system.

Rule captures can be used in the variable name, selector, and output path.

Because of this, adding a component group in Figma needs no config change. For example, `base surface/tabs/color/fill` becomes `--kirby-tabs-color-fill` in `semantic/tabs.css`.

The command must still say which rule set applies to each input file, such as `--in palette=...` or `--in theme=...`.

The export does not say whether it is a palette or a theme. Its only useful file-level field is `com.figma.parentVariableSetName`, a display name that changes too often to depend on.

### 5. Invalid input fails loudly

If a value matches no rule, the build fails.

To leave something out, add an explicit `ignore` rule. This makes the exception visible in code review and version control.

There are three ways to control what ships:

- choose what to export from Figma
- add an `ignore` rule
- choose which generated CSS files to import

Only the `ignore` rule is stored in this repository.

The build also fails when two values produce the same variable name under the same selector.

The selector matters. The same variable name must exist under all three surface selectors, so a global duplicate check would reject the intended design.

This check found a real bug. Semantic `font/weight/*` and primitive `font-weight/*` both became `--kirby-font-weight-light`. The semantic variable then referred to itself.

### 6. Paths stay unchanged and aliases use membership

The Figma path becomes the custom property name:

`system/color/green/500` becomes `--kirby-system-color-green-500`.

The generator does not rename token levels, cut pieces from paths, or read collection display names.

Rules create names without changing the source tree. DTCG references therefore keep working.

For example, a value containing `{spacing.xxxxs}` becomes `var(--kirby-spacing-xxxxs)` because that is the name assigned to its target.

An older version renamed tree keys to add the prefix. It then had to rewrite every reference too. We no longer do that.

Aliases are resolved through a map of variable names to references across all loaded input files.

If an alias points to a target outside that map, the generator leaves its literal value in the CSS.

That is correct for values Figma stores inline, such as `focus`. It also looks the same as a stale export, so the build reports every unresolved target and how many times it occurred.

Brands do not override system primitives.

A brand changes success or danger colours by pointing semantic aliases at different primitives.

Each scope has its own path prefix, so `system/...` and `brand/...` cannot produce the same variable in `:root`. Load order is not a problem.

### 7. Generated CSS is committed; Figma JSON is not

All JSON exported from Figma is ignored by Git.

The generated default CSS is committed. Consumers treat that CSS as the source of truth.

Regeneration is a manual step taken by whoever has just exported from Figma. It is not wired into `postinstall`, CI, or an npm script — a script would imply the inputs are always available, and they never are. A fresh checkout cannot regenerate the CSS without those exports, which is why the CSS is committed. The exact invocation lives in the generator's README.

An external theme is passed as a `--delta` input, not handled by a separate mode.

The generator emits only values marked as overrides whose resolved values differ from the baseline. These values sit on top of the shipped default brand instead of replacing it.

### 8. What this system does not do

Typography stays in code.

Font sizes use `clamp()`, and line heights use unitless ratios. Figma exports static pixel values, so it cannot represent either one correctly.

Typography utility classes may use generated primitive tokens, but the classes own their responsive behaviour.

Elevation is emitted as separate values, such as `--kirby-elevation-2-blur`.

Hand-written SCSS combines those values into `box-shadow`. That combination is design-system logic and does not belong in the generator.

A surface does not change based on its parent. For example, `raised` on `brand` is not different from `raised` on `base`.

Supporting that would add a fourth context and require a different model, not just more token values.

## Rejected options

### Components detect their context

A component could read a class or attribute and choose its tokens.

We rejected this because every component and token lookup would need context logic. Nested components would also be easy to break.

### Unlimited relative nesting

`raised` could mean one level higher than its parent, or a colour mixed toward the foreground.

We rejected this because it is hard to tune for accessibility, hard to judge in Figma, and unclear when surfaces are nested.

### A fixed list of nesting levels

We could define `raised`, `raised-on-raised`, and more.

We rejected this because borders already separate nested surfaces of the same type.

### Put Kirby's theme model in the generator

The generator could contain branches for surfaces, levels, and categories.

We rejected this because every Figma restructure would require a code change. The generator would also be tied to Kirby.

We tested the config-based approach with a completely restructured export. Eleven theme rules became four, and two new Figma groups worked without config or code changes.

### Rewrite the tree before resolving colours

An older version changed the source tree before resolving colours.

We rejected this because changing the tree breaks normal reference resolution and forces another pass to rewrite every alias. Section 6 explains the current approach.

## Consequences

- The layout may feel backwards. One context-free set of variable names gets new values under three selectors. The context is not part of each name.
- A surface sets its context and paints itself on the same element. The element uses `.kirby-surface-<kind>` and reads its own surface variables. No wrapper is needed, and cascade order is not a problem.
- A variable name no longer tells you whether its value changes by surface. For example, `--kirby-color-fill-base` changes under `.kirby-surface-raised`, but `--kirby-spacing-s` does not.
- The old `theme` segment made that difference visible. Duplicate checks cover correctness. Documentation and a future lint rule must cover readability.
- Some names intentionally leave out loudness or state. Examples are `raised-<intent>` on `border` and `content`, `border-focus-<loudness>` with no state, and `border-neutral-default` with no loudness.
- Style Dictionary's `color/css` transform cannot be used. It outputs `[object Object]` for DTCG colour objects even when `usesDtcg: true`, so the generator renders values itself.
- Figma's `hex` field has no alpha value. Colours with partial alpha must use `components` and output `rgba()`. Using `hex` flattened 45 translucent values, including every elevation shadow.
- Nothing imports the generated CSS yet. Components still use hand-written Sass maps and `get-color()`.
- Because there are no consumers yet, renaming the semantic level was safe. Components must use the new names when they adopt the generated CSS.

## Open questions

- Border radius `circle`: code uses `50%`, while Figma uses `999px`. Design and engineering need to choose one.
- Loudness: decide whether `loud`, `normal`, `quiet`, and `silent` are useful after auditing real component needs.
- [`DESIGN-TOKENS.md`](../../DESIGN-TOKENS.md) is stale. It still describes names starting with `--kirby-theme-color-...`.
- Figma has several naming problems. None block this work, but the generator reports them.
- `spot/raised/color/fill/spot-danger` should end in `danger`. A test expects the completeness warning so it is not forgotten.
- `chart` is stored as a colour category instead of a component group. An `ignore` rule excludes it until Figma is fixed.
- `imageBanner` uses camelCase and becomes `--kirby-imagebanner-*`.
- `font/weight/normal-italc` contains a typo.
- `component/kirby-card-border-radius` repeats the Kirby prefix.
