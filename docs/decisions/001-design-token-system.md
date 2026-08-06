# ADR-001: Design Token System — Pipeline and Surface-Based Theming

## Status

Accepted

## Date

2026-07-24

## Context

Kirby's design tokens flow from Figma variable exports into CSS custom
properties: colors, spacing, border-radius, and font-weight. This ADR records
the design system's two intertwined decisions — **how components are themed**
(the surface/context model) and **how the tokens are generated** (the
`@repo/design-tokens` pipeline).

This is exploratory work. It consolidates and supersedes an earlier series of
separate ADRs; treat this document as the single current-state record rather
than a history of the churn that produced it. The companion glossary in
[`DESIGN-TOKENS.md`](../../DESIGN-TOKENS.md) defines the theming vocabulary in
full.

## Decision

### Part A — Surface-based theming model

Theming is modelled as **exactly three surface contexts** (`base`, `raised`,
`brand`) plus a **context-neutral colour contract**:

- **Surfaces** (app background, card, list) have a fixed kind, an **absolute**
  appearance (independent of nesting depth), and **establish** one of the three
  contexts for their descendants.
- **Components** (button, input, checkbox, flag, …) **re-skin** against whatever
  context they currently sit in, by choosing a **prominence** (`base/raised/brand`)
  or an **intent** (`success/warning/danger/…`). They **never establish a
  context**. Prominence and intent drive `fill` exclusively; `border` and
  `content` may carry a bounded intent overlay on a `raised` element (e.g. a
  danger border on a raised input for validation).
- Colour tokens are named **without** the context — the context is carried by a
  surface selector instead. Variables are
  `--kirby-theme-color-<role>-<prominence|intent>-<loudness>-<state>` (every
  segment explicit), and each surface re-assigns this one flat contract under
  its selector (`.kirby-surface-base` — also seeded at `:root` —
  `.kirby-surface-raised`, `.kirby-surface-brand`). Components read the variables
  blindly and inherit through the cascade. No JS, no context-awareness in
  components. (The Figma export may label these surfaces `"base surface"` /
  `"raised surface"` / `"brand surface"`; the pipeline strips the ` surface`
  suffix at ingestion and keys everything by the canonical `base`/`raised`/`brand`
  id, so both export shapes are accepted.)

**Invariants:** there are only ever three contexts; a single element must never
both re-skin _and_ establish a context (that would reintroduce a ladder);
same-kind adjacency separating with only a border is **emergent**, not encoded;
the consistency wiring — a raised surface's fill equals the `raised` context's
background equals the raised-prominence fill in the parent context — is a
cross-context constraint the token _values_ must uphold.

**Rejected theming alternatives:**

- _Components resolve their own context_ (read a class/attribute and branch).
  Rejected: pushes context-awareness into every component and token reference;
  nesting becomes fragile.
- _An unbounded relative model_ where "raised" is computed (+1 elevation / mix
  toward foreground). Rejected: hard to tune for accessibility, hard to eyeball
  in Figma, muddy nested results.
- _A bounded ladder of enumerated depths_ (`raised`, `raised-on-raised`, …).
  Rejected: same-kind nesting is resolved by the always-present border, so no
  deeper palettes are needed.

### Part B — The generation pipeline

#### 1. A self-contained workspace package

The pipeline is a workspace package, not loose scripts:

| Property     | Value                                                                       |
| ------------ | --------------------------------------------------------------------------- |
| Location     | `tools/design-tokens/`                                                      |
| Package name | `@repo/design-tokens`                                                       |
| Language     | Plain ESM (`.mjs`), no build step                                           |
| Entry point  | Single `bin` with a flag-driven CLI                                         |
| Tests        | `node:test`, inside the package                                             |
| Engine       | Style Dictionary v4, programmatic API (no intermediate token files on disk) |

Plain ESM matches `stylelint-plugin-kirby-design-tokens` (no `tsc` step, runs
directly under Node).

#### 2. Structure-driven, flag-driven CLI

```sh
design-tokens --primitive <file...> \
              --semantic  <file...> \
              [--override <name>] \
              [--prefix <name>] \
              --out <dir>
```

- **Structure-driven extraction.** The tool extracts every collection present in
  each input file — no hardcoded collection allowlist. A file's structure and
  each token's `$type` drive extraction and output routing. The CLI is organized
  by **token role**, not by source file type.
- **`--prefix`** (default `kirby`) is added to output variable names **and** to
  references: `{spacing.xxxxs}` → `var(--kirby-spacing-xxxxs)`. Required because
  the Figma exports no longer carry the prefix. The prefix is a fixed **product**
  identifier, unrelated to (churny) Figma collection display names.
- **Scope is governed upstream**, not in the tool — by what is exported from
  Figma and by which generated CSS files the consuming SCSS imports. Font-size,
  line-height, loudness-scale, and component specs are extracted _if present_;
  they are kept out of the shipped system by trimming the export and not
  importing the generated files.

Default build:

```sh
design-tokens \
  --primitive specs.json primitive.color.system.json primitive.color.brand.json \
  --semantic  semantic.color.brand.json \
  --out <dir>
```

#### 3. Membership-driven colour resolution

The Figma sources are self-describing trees whose leaf paths encode scope
(`system/color/<group>/<shade>`, `brand/color/<group>/<shade>`; surfaces
`base`/`raised`/`brand`/`font` in the semantic file).

- **The Figma path _is_ the custom-property name.** `system/color/green/500` →
  `--kirby-system-color-green-500`; `brand/color/dark-blue/950` →
  `--kirby-brand-color-dark-blue-950`. No tier renaming, no path slicing, and
  the tool never reads a collection display name.
- **Resolution is by membership.** A membership map from the merged primitive
  tree maps every leaf's variable name to its DTCG reference. A semantic alias
  resolves iff its `targetVariableName` is a key in that map; otherwise its
  literal value is kept inline (e.g. `focus`, `font-weight/*`). Pure `Map`
  lookup, immune to Figma renames.
- **Brands do not override system primitives.** System colours (red, green,
  greys) are always present; a brand's success/warning/danger choices live in
  the **semantic layer** (an alias re-points to `brand/color/*`). Because each
  scope carries its own path prefix, `system/…` and `brand/…` never collide in
  one `:root`, so there is nothing to override and no load-order gymnastics.
- **`nameSemantic` disambiguates the `brand` collision.** A colour scope
  (`brand`) shares a top-level key with a semantic surface (`brand`). A token is
  a surface token only when `path[0]` is a surface **and** `path[1] !== 'color'`;
  merging the colour tree into the semantic tree is a one-level-deep merge so
  `brand.color.*` and `brand.fill.*` coexist.

#### 4. Output structure — `--out` governs everything

`--out` is the single, always-required output root; the tool owns the
substructure beneath it:

```
<out>/
├── primitives/
│   ├── spacing.css          ← :root { --kirby-spacing-* }
│   ├── border-radius.css    ← :root { --kirby-border-radius-* }
│   ├── font-weight.css      ← :root { --kirby-font-weight-* }
│   ├── system-color.css     ← :root { --kirby-system-color-* }   (always emitted)
│   └── brand-color.css      ← :root { --kirby-brand-color-* }    (default brand, always emitted)
├── semantic/
│   ├── color.css            ← .kirby-surface-{base,raised,brand}
│   └── color-chart.css      ← .kirby-surface-{base,raised,brand} (chart tokens, per-surface)
└── overrides/               ← gitignored by the consuming repo
    └── <name>/
        ├── primitives/…
        └── semantic/…
```

- **`--override <name>`** generates an _external theme_ as a **semantic delta**
  against the default files in the same run: only tokens flagged
  `com.figma.isOverride` whose membership-resolved value differs from the default
  are emitted, under `<out>/overrides/<name>/`. The shipped default brand is part
  of the default build; an override is layered on top of it — not a second brand
  palette.
- Each surface defines its **full** token set (not deltas vs. the base surface),
  which is more robust when surfaces are nested or components are used outside
  their expected DOM context.

#### 5. Figma JSON is build input, never committed

All Figma-derived JSON (`specs.json`, `primitive.color.system.json`,
`primitive.color.brand.json`, `semantic.color.brand.json`, override exports) is
gitignored build input. **Only the generated default CSS is committed** — it is
the source of truth for consumers. Regeneration is a manual/CI step that
supplies the Figma exports; it does not run in `postinstall`.

#### 6. Prep and Style Dictionary specifics

- **No standalone specs prep.** A generic structural extractor collects leaf
  tokens from any input file, adds the prefix to names and references, preserves
  DTCG references (`{spacing.xxxxs}` → `var(--kirby-spacing-xxxxs)`), and emits.
  `specs.json` is fed to Style Dictionary essentially as-is.
- **Colour prep** performs the irreducible work: merge scopes, build the
  membership map, resolve aliases, compute override deltas.
- **Hex extraction is an SD `value/hex` transform**, not prep-time logic. (SD
  4.4's `color/css` transform emits `[object Object]` for the DTCG
  `{ colorSpace, components, alpha, hex }` object even with `usesDtcg: true`,
  verified by spike — so hex must be extracted explicitly.)
- **`outputReferences: true`** everywhere: references between tokens are emitted
  as `var()` and never resolved to raw values.

#### 7. Three-tier token hierarchy

| Tier      | CSS prefix(es)                                                                                                             | Selector                                                   |
| --------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Primitive | `--kirby-system-color-*`, `--kirby-brand-color-*`, `--kirby-spacing-*`, `--kirby-border-radius-*`, `--kirby-font-weight-*` | `:root`                                                    |
| Semantic  | `--kirby-theme-color-*`                                                                                                    | `.kirby-surface-<surface>` (`base` also seeded at `:root`) |
| Component | component-scoped tokens (`spot`, `logo`, `chart`, `tabs`, `toolbar`, …)                                                    | component class                                            |

#### 8. Typography stays code-owned

Font-size and line-height are **not** generated: code uses `clamp()` for
responsive font sizes and unitless ratios for line-heights, neither of which
Figma's static px exports can express. Typography utility classes
(`.kirby-text-display-1`, …) are SCSS mixins/classes that may reference generated
primitives (e.g. `var(--kirby-font-weight-black)`) but own their responsive
behaviour.

## Consequences

- The theming model inverts the token layout: one flat, context-neutral contract
  re-assigned under three surface selectors, rather than context baked into
  names.
- **Surfaces paint from their own established context, not their parent.** A
  surface element carries `.kirby-surface-<kind>` and reads its own plane tokens
  (`fill-base` / `content-base` / `border-neutral`) from that same class —
  establish and paint happen in one context, on one element, so there is no
  wrapper and no cascade-ordering problem. A consequence is that surface
  appearance is a fixed function of its _own_ kind: a `raised` card is identical
  on a `base` page and on a `brand` panel. Parent-dependent surface looks
  ("raised-on-brand" ≠ "raised-on-base") are deliberately out of scope — they are
  the fourth context / ladder this model forbids, and would require a model
  change rather than new token values. See _Modelling surfaces_ in
  [`DESIGN-TOKENS.md`](../../DESIGN-TOKENS.md).
- The pipeline is a self-contained, reusable package decoupled from any output
  location; scope lives with the operator (what you export, what you import), not
  in tool logic.
- A fresh checkout cannot regenerate CSS without supplying Figma exports; the
  committed CSS is the source of truth for consumers.
- The generated CSS is not yet imported anywhere — components still use
  hand-authored Sass maps / `get-color()`. Consumers must adopt the
  `--kirby-system-color-*` / `--kirby-brand-color-*` / `--kirby-theme-color-*`
  names when they wire it up.
- **Loudness/state exceptions** in emitted names are expected: the bounded
  `raised-<intent>` overlay on `border`/`content`; `border-focus-<loudness>`
  (no state); `border-neutral-default` (no loudness). See the glossary's
  _Naming grammar_ section.

## Open questions

- **Border-radius `circle`** — `50%` in code vs `999px` in Figma; needs
  resolution between design and code.
- **Loudness** — whether the `loud/normal/quiet/silent` sub-axis survives
  long-term, or is pruned once real component needs are audited.
