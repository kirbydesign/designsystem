# @repo/design-tokens

Structure-driven CLI that turns Figma variable exports into Kirby design-token
CSS custom properties. See
[ADR-001](../../docs/decisions/001-design-token-system.md)
for the design rationale.

## Philosophy

The tool is **dumb on purpose**. The Figma structure dictates the output: it
extracts whatever collections the input files contain, adds a namespace prefix,
and lets Style Dictionary emit CSS. It does not know which collections are
"allowed" or what a collection is _called_ in Figma — scope is an operator
concern governed by:

- **what you export** from Figma, and
- **which generated files your SCSS imports.**

Units, references, and color names are all derived from the structure of the
Figma export, never from a hardcoded list:

- `com.figma.scopes` decides whether a number gets `px`.
- A color leaf's Figma path _is_ its custom-property name:
  `system/color/green/500` → `--kirby-system-color-green-500`.
- A semantic alias resolves to a primitive by **membership** — its
  `targetVariableName` matching a primitive leaf path — never by the Figma
  collection's display name (which churns: `08 Kirby Palette` →
  `08 System Palette` → …).

## Install

The package lives in the workspace under `tools/design-tokens` and pulls in its
own `style-dictionary`. Nothing else to wire up — run it with `node`.

## Usage

```
design-tokens --primitive <file...> \
              --semantic  <file...> \
              [--override <name>] \
              [--prefix <name>] \
              --out <dir>
```

| Flag                  | Meaning                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--primitive <file…>` | Primitive exports. Number collections → `primitives/<collection>.css`; each color scope → `primitives/<scope>-color.css` (`system-color.css`, `brand-color.css`, …). |
| `--semantic <file…>`  | Semantic (per-surface) color exports → `semantic/color.css` + `semantic/color-chart.css`.                                                                            |
| `--override <name>`   | Build an external theme as a semantic delta vs the default files in the same run. Output lands under `<out>/overrides/<name>/`.                                      |
| `--prefix <name>`     | Variable/reference namespace. Default: `kirby`.                                                                                                                      |
| `--out <dir>`         | Output root (required).                                                                                                                                              |
| `-h`, `--help`        | Show help.                                                                                                                                                           |

Files listed after `--primitive`/`--semantic` are space-separated and read until
the next flag.

## Default build

The canonical Kirby build (run from the repo root, output into the committed
themes directory):

```
node tools/design-tokens/bin/design-tokens.mjs \
  --primitive specs.json primitive.color.system.json primitive.color.brand.json \
  --semantic  semantic.color.brand.json \
  --out libs/core/src/scss/themes
```

This writes:

- `primitives/<collection>.css` — one file per number/string collection
  (`spacing`, `border-radius`, `font-size`, `font-weight`, …), `:root` scoped.
- `primitives/system-color.css` — the shared system palette (red, green,
  greys, …), `:root`. Always present.
- `primitives/brand-color.css` — the shipped default brand's palette, `:root`.
  A separate path prefix (`brand/…`) means brand and system colors never
  collide in one `:root`; brand does **not** override system primitives —
  brand success/warning/danger choices live in the semantic layer.
- `semantic/color.css`, `semantic/color-chart.css` — per-surface semantic
  tokens under `.kirby-surface-{base,raised,brand}`, each aliasing a system or
  brand color primitive by membership.

## Override (external theme) build

To generate an external theme, pass the default files **first** and the
override file **last** in both `--primitive` and `--semantic`; the tool computes
a semantic delta against the defaults (only tokens flagged as overrides in Figma
that actually differ are emitted):

```
node tools/design-tokens/bin/design-tokens.mjs \
  --override theme-1 \
  --primitive specs.json primitive.color.system.json primitive.color.brand.json theme-1.color.brand.json \
  --semantic  semantic.color.brand.json theme-1.semantic.color.brand.json \
  --out libs/core/src/scss/themes
```

Output lands under `libs/core/src/scss/themes/overrides/theme-1/` (git-ignored):
the override's own color scope plus its semantic delta in `semantic/color.css`
and `semantic/color-chart.css`.

## Inputs are not committed

Figma variable exports (`specs.json`, `primitive.color.system.json`,
`primitive.color.brand.json`, `semantic.color.brand.json`, `typography.json`)
are source data and are git-ignored. Re-export them from Figma when regenerating
tokens.

## Tests

```
cd tools/design-tokens
node --test
```
