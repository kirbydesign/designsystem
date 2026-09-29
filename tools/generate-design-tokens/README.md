# @repo/generate-design-tokens

Figma exports are temporary inputs. The importer stages a DTCG
`tokens.json` and CSS in the ignored `dist/` directory. The committed built-in
JSON can regenerate its CSS without Figma. [ADR-001](../../docs/decisions/001-design-token-pipeline.md)
explains the decisions; [DESIGN-TOKENS.md](../../docs/DESIGN-TOKENS.md) defines
the theming model.

## Built-In Theme

Pass any number of Figma exports. For the built-in theme:

```sh
npx design-tokens specs.json primitive.color.system.json primitive.color.brand.json semantic.color.brand.json
```

Review the staged files, then promote `tokens.json` and the CSS into
`libs/core/src/scss/themes/`. Do not run the tool directly against that
directory. The three CSS files are `primitives.css`, `primitives-color.css`,
and `surfaces.css`.

To generate the committed CSS from a fresh DTCG document:

```sh
npx design-tokens \
  --css-only libs/core/src/scss/themes/tokens.json
```

The committed JSON, generator, and config at the same revision reproduce the
CSS byte-for-byte. `npm run test-design-tokens` verifies this on every run.

## Brand Theme

Brands can use `--baseline` to build on top of the built-in theme. The baseline
provides reference tokens, and generated CSS contains only declarations that
differ from it:

```sh
npx design-tokens --baseline libs/core/src/scss/themes/tokens.json \
  <name>.brand.json <name>.semantic.json
```

The generated CSS can be regenerated from the staged DTCG document using the
same baseline:

```sh
npx design-tokens --baseline libs/core/src/scss/themes/tokens.json \
  --css-only dist/tokens.json
```

Promote staged files into the consuming app, not this repository. Load Kirby's
CSS before the app's CSS. Unchanged declarations then come from Kirby, and app
declarations override them. More generally, a baseline lets a brand theme use
existing values and generate only its own differences.

## Pipeline

The pipeline has three steps:

1. **Import:** positional Figma export paths are merged at their original paths
   and written to one DTCG `tokens.json`. Duplicate paths and
   token/group conflicts fail. Figma aliases become DTCG references when their
   targets are present in the import or baseline. Missing alias targets keep
   Figma's literal value and produce a warning.
2. **Generate CSS:** ordered rules in the config assign CSS names, selectors,
   output files, and sections. Tokens matching no rule fail; `ignore` rules
   deliberately omit tokens from CSS. Style Dictionary converts DTCG values
   and resolves references.
3. **Review and promote:** JSON and CSS are staged in this package's ignored
   `dist/` directory. Review the staged changes, then promote built-in files to
   Kirby or app files to the consuming app.

With `--css-only`, the tool skips import and generates CSS from an existing DTCG
document. It still stages output in this package's `dist/` directory.

## DTCG Document

All supplied exports merge into one JSON tree at their original Figma paths,
including `base surface`, `raised surface`, and `brand surface`. The document
contains all exported tokens, even those excluded from CSS. The importer
converts Figma aliases into DTCG `$value` references, scoped numbers into
dimensions where appropriate, and rounds Figma's float32 color alpha. For
percentage-valued number tokens, it retains the Figma scope in DTCG
`$extensions` so CSS generation can apply `%` at any path. Other Figma metadata
is omitted. The importer rejects duplicate token paths and token/group
conflicts. Percentages stay DTCG numbers and gain `%` in CSS only. CSS
selectors, file routes, and generator annotations are not stored in the JSON.

By default, positional Figma JSON files are merged without tier labels, written
to `tokens.json`, and used to generate CSS. `--css-only` generates CSS from an
existing DTCG document without writing a new token file. These input modes are
mutually exclusive. A baseline is loaded only when `--baseline` is provided.

## Configuration

[`design-tokens.config.mjs`](../../design-tokens.config.mjs) defines the prefix,
Figma-scope unit mapping, and one ordered CSS rule list:

- The first matching rule chooses `variable`, `selector` (default `:root`),
  `output`, optional `section`, and `outputReferences` (default `true`).
- An `ignore` rule omits a token from CSS but leaves it in `tokens.json`.
  A token matching no rule fails CSS generation.

Patterns are `/`-separated segments: literal text, `*` for one segment,
`{name}` to capture part of one segment, and a final `**` for one or more
segments captured as `{rest}`. Templates can use `{prefix}`, `{path}` (the
entire path, dash-joined), `{rest}`, and their rule's captures. Substitutions
are slugged. The config validates placeholders, duplicate rule IDs, and
unreachable catch-all rules when loaded.

Numeric units are assigned during import using Figma `com.figma.scopes` or
source-path patterns. Style Dictionary loads DTCG, resolves aliases, converts
colors, and generates CSS variables. Kirby-specific naming, selector routing,
dimension units, and section grouping are handled by the generator.

## Diagnostics And Tests

Duplicate CSS names under the same selector fail. The same name under different
surface selectors is intentional. In the built-in theme, a section missing
names on one surface produces a warning (the current Figma export has a known
`spot-danger` asymmetry). A component found on only one surface is not compared.
When a baseline is supplied, CSS is compared to it after generation, by
selector, variable name, and value; unchanged declarations are omitted. Inspect
warnings and staged output before promotion.

```sh
npm run test-design-tokens
```

The committed JSON-to-CSS regression always runs without the downloaded Figma
exports. Synthetic fixtures cover aliases, units, collision handling, and CSS
generation edge cases. Review changes to the staged JSON and CSS when importing
new exports.
