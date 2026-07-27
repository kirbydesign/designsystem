# @repo/design-tokens

Turns Figma variable exports into CSS custom properties.

The tool knows exactly one thing:

> a token tree of leaves → an ordered rule set → for each leaf, the first
> matching rule supplies its **variable name**, **selector** and **output file**.

It contains no design-system vocabulary — no surfaces, no tiers, no categories,
no collection allowlist. All of that lives in a config file, so changing the
theming concept is a config edit rather than a code change. See
[ADR-001](../../docs/decisions/001-design-token-system.md) for why it is built
this way; this document covers how to use it.

Plain ESM, no build step. Style Dictionary v4 via its programmatic API, so no
intermediate token files are ever written to disk.

## Usage

```
design-tokens --out <dir> [--config <file>]
              [--in    <set>=<file...>]
              [--ref   <set>=<file...>]
              [--delta <set>=<file...>]
```

| Flag                      | Meaning                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `--in <set>=<file...>`    | Load and **emit** these files through rule set `<set>`.                                                               |
| `--ref <set>=<file...>`   | Load for **reference resolution only** — populates the alias membership map and the delta baseline; emits nothing.    |
| `--delta <set>=<file...>` | Emit only leaves flagged as overrides whose resolved value differs from the `--ref`/`--in` baseline for the same set. |
| `--config <file>`         | Config module. Default `design-tokens.config.mjs` in the working directory.                                           |
| `--out <dir>`             | Output root. Required; the rules' `output` templates own everything beneath it.                                       |
| `-h`, `--help`            | Show help.                                                                                                            |

Values are space-separated and read until the next flag. All three input flags
are repeatable. `<set>` must name a rule set the config declares.

`--ref` is set-scoped rather than global because a referenced leaf still needs a
name — which needs a rule, which needs a rule set.

## Kirby's build

There is deliberately no npm script for this. The Figma exports are never
committed, so the build only runs when someone has just downloaded a fresh set
— an occasional, manual step, not part of any automated pipeline.

Drop the four exports at the repo root and run, from there:

```sh
npx design-tokens --out libs/core/src/scss/themes \
  --in palette=specs.json primitive.color.system.json primitive.color.brand.json \
  --in theme=semantic.color.brand.json
```

Then review the diff and commit the generated CSS — that is what consumers
read, and the only record of the tokens that survives in the repository.

It produces:

```
libs/core/src/scss/themes/
├── primitives/
│   ├── color.css            ← --kirby-{system,brand}-color-*   at :root
│   └── collection.css       ← --kirby-{spacing,border-radius,…}-*  at :root
└── semantic/
    └── theme.css            ← the whole semantic tier, one section per category
```

`theme.css` holds the standard colour contract, every component group, the
elevation atomics and the non-surface groups (`font`). Blocks are grouped into
**sections** — one per category — each behind a comment, with all three surfaces
re-declaring that section's contract:

```css
/*
 * spot
 */

:root,
.kirby-surface-base {
  --kirby-spot-color-fill-base: …;
}
.kirby-surface-raised {
  --kirby-spot-color-fill-base: …;
}
.kirby-surface-brand {
  --kirby-spot-color-fill-base: …;
}
```

An external theme is a `--delta` input pointed at a different `--out`, layered
on top of the default brand rather than replacing it:

```sh
npx design-tokens --out libs/core/src/scss/themes/overrides/<name> \
  --ref   palette=specs.json primitive.color.system.json primitive.color.brand.json \
  --in    palette=<name>.brand.json \
  --ref   theme=semantic.color.brand.json \
  --delta theme=<name>.semantic.json
```

## Config

A single `.mjs` module with a default export. Kirby's lives at the repo root as
[`design-tokens.config.mjs`](../../design-tokens.config.mjs).

```js
export default {
  prefix: 'kirby',

  // Units for numeric leaves. `scopes` matches Figma's `com.figma.scopes`;
  // `paths` matches the source path, for collections Figma scopes ALL_SCOPES.
  units: {
    px: { scopes: ['GAP', 'CORNER_RADIUS'], paths: ['background-blur/**'] },
    '%': { scopes: ['OPACITY'] },
  },

  // $extensions key marking a leaf as an external-theme override.
  deltaFlag: 'com.figma.isOverride',

  // Named, ordered rule sets. Within a set, first match wins.
  // Set names are arbitrary — the tool blesses none of them.
  ruleSets: {
    palette: [
      {
        id: 'color',
        match: '{scope}/color/**',
        variable: '{prefix}-{scope}-color-{rest}',
        output: 'primitives/{scope}-color.css',
        outputReferences: false,
      },
    ],
  },
};
```

Units live at the top level rather than on rules because rules govern naming and
routing, whereas a unit is value formatting. The `paths` matcher is an escape
hatch for collections Figma scopes `ALL_SCOPES`, which carries no dimensional
signal — `elevation` and `background-blur` would otherwise emit unitless and be
unusable in `box-shadow` and `blur()`.

### Rule fields

| Field              | Meaning                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `id`               | Unique within its set. Appears in diagnostics.                          |
| `match`            | Path pattern, matched against the leaf's source path.                   |
| `ignore`           | Drop matched leaves and report a count. Excludes all fields below.      |
| `variable`         | Custom-property name, without the leading `--`.                         |
| `selector`         | Selector the block is emitted under. Default `:root`.                   |
| `output`           | Destination file, relative to `--out`.                                  |
| `section`          | Groups blocks within a file behind a comment. Optional.                 |
| `outputReferences` | Emit references as `var()` rather than resolved values. Default `true`. |

`outputReferences: false` resolves a reference to the underlying literal value.
Kirby's config never sets it — flattening a reference discards the indirection
the design system depends on — but it is available for rule sets that need it.

### Sections

A rule may declare a `section` template. Blocks sharing an output file are then
grouped by their resolved section, in first-seen order, each behind a comment
naming it. Omit it and the file is one unlabelled run of blocks, as before.

Sections also scope the completeness check below, which is usually the reason
to reach for one: a category defined on only some surfaces is compared against
its own siblings rather than against every other block in the file.

### Pattern syntax

A `/`-separated list of segment patterns. A segment pattern is literal text
containing zero or more placeholders; each placeholder matches one or more
characters **within** that segment.

| Form                | Matches                                                       |
| ------------------- | ------------------------------------------------------------- |
| `color`             | exactly the segment `color`                                   |
| `*`                 | any one segment, uncaptured                                   |
| `{category}`        | any one segment, captured as `category`                       |
| `* surface`         | any segment ending in ` surface`, uncaptured                  |
| `{surface} surface` | any segment ending in ` surface`, capturing the leading part  |
| `**`                | one or more remaining segments, captured as `rest`. Last only |

The `{name} literal` form is what lets the config capture a canonical `base` out
of the `"base surface"` group name Figma exports, without the tool knowing that
surfaces exist.

### Template syntax

`{prefix}`, `{rest}`, `{path}` (the full source path, dash-joined), plus any
named capture from the rule's own pattern. Every substitution is slugged, so a
Figma group called `"Dark Blue"` cannot produce an invalid identifier.

Templates are validated at config-load time: a `{name}` the rule's pattern
cannot produce fails immediately, naming the rule.

## Diagnostics

The build **fails** on:

- a leaf matching no rule in its set, naming the path, the set, and the rules tried
- two leaves resolving to the same variable name **under the same selector** —
  the per-selector qualifier is what allows one name to be deliberately
  re-declared across surface selectors
- a malformed config: duplicate rule id, `**` not last, unknown template
  variable, or an `ignore` rule that also declares a `variable`

It **warns** on:

- blocks sharing an output file **and section** that declare different variable
  sets — each surface is meant to define the full contract, so an asymmetry
  means some component silently inherits another surface's value through the
  cascade. In practice this catches Figma naming typos. Reported as
  `semantic/theme.css [spot]: …`.
- aliases whose target is not a member of any loaded input, reported per target
  with a count. These fall back to inlining a literal value, which is correct
  for values Figma holds inline (`focus`) and otherwise means a stale export.

## Layout

```
src/
  rules.mjs          pattern compile/match, template interpolation  (no I/O, no SD)
  config.mjs         config loading and validation
  resolve.mjs        the load phase: rules → names, membership, aliases, deltas
  sd-transforms.mjs  Style Dictionary hooks; all annotation-driven
  build.mjs          one SD build, files derived from emissions
  cli.mjs            argument parsing and orchestration
  tokens.mjs         token-tree helpers
```

Rules are resolved **once, at load time**, and written onto each leaf's
`$extensions`. Style Dictionary's name transform is then a lookup and its file
filter an equality check — which keeps the rule engine fully unit-testable
without booting Style Dictionary.

## Tests

```sh
npm run test-design-tokens     # from the repo root
node --test                    # from this directory
```

Everything runs on committed fixtures except `test/integration.test.mjs`, which
builds the real Figma exports and asserts structural properties of the result:
file routing, section grouping and order, naming shape, unit application, alpha
preservation, and that no alias resolves to a literal except the ones Figma
holds inline. It skips itself when the exports are absent, since they are
gitignored build input — so a fresh checkout runs the rest of the suite and
reports these as skipped.

Those assertions are deliberately structural rather than value snapshots — the
palette changes often, the export _shape_ should not.
