# @repo/generate-design-tokens

The Design Token Pipeline can be used to generate a full design token set from one or more Figma Extended Collections. It produces a DTCG-compliant token document and, from that, generates the full set of CSS Custom Properties based on a configuration file, as described in [Configuration](#configuration).

The generated files are _staged_ in this library's `dist/` directory. From there, they can be moved manually either to Kirby's core package, when generating the built-in theme, or to the brand or app being updated.

## Usage

The pipeline accepts any number of Figma collections as input.
The examples below assume that the following three primitive collections and one semantic mapping file exist:

- General primitives (`primitives.json`)
- System color primitives (`system-color-primitives.json`)
- Brand color primitives (`brand-color-primitives.json`)
- Brand semantics (`brand-semantics.json`)

## Built-In Theme

To generate or update Kirby's built-in theme, pass the whole set of Figma collections:

```sh
npx design-tokens primitives.json system-color-primitives.json brand-color-primitives.json brand-semantics.json
```

Output files are written to `tools/generate-design-tokens/dist`. Review the staged files, then promote `tokens.json` and the CSS into
`libs/core/src/scss/themes/`. Do not run the tool directly against that
directory.

To generate only the CSS from a fresh DTCG document:

```sh
npx design-tokens \
  --css-only libs/core/src/scss/themes/tokens.json
```

## Brand Theme

Brands can use `--baseline` to build on top of the built-in theme. The baseline
provides reference tokens, and the generated CSS contains only declarations that
differ from it:

```sh
npx design-tokens --baseline libs/core/src/scss/themes/tokens.json \
  <name>-color-primitives.json <name>-semantics.json
```

To regenerate the CSS from the staged DTCG document, use the same baseline:

```sh
npx design-tokens --baseline libs/core/src/scss/themes/tokens.json \
  --css-only tools/generate-design-tokens/dist/tokens.json
```

Then, promote the staged files into the consuming app, not this repository. Load
Kirby's CSS before the app's CSS so that unchanged declarations come from Kirby
and the app's declarations override them.

## DTCG Document

All supplied Figma exports are merged into a [DTCG JSON](https://www.designtokens.org/tr/drafts/format/) tree, with each variable at its original Figma path. The document
contains all exported tokens, even those excluded from CSS.

The importer converts Figma aliases into DTCG `$value` references and writes the output
to a `tokens.json` file that can be used to generate CSS. `--css-only` generates CSS from an
existing DTCG document without writing a new token file. These input modes are
mutually exclusive. A baseline is loaded only when `--baseline` is provided.

## Configuration

[`design-tokens.config.mjs`](../../design-tokens.config.mjs) holds Kirby's
theming model, so the generator itself stays generic.

The config accepts the following fields:

| Field          | Description                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| `ignore`       | Globs for tokens left out of CSS. They are still written to `tokens.json`.                               |
| `variableName` | Required. `(path) => parts`, e.g. `['kirby', 'color', 'fill']`. Parts are lowercased and joined.         |
| `outputs`      | Required. `{ 'file.css': [block, …] }`. See below.                                                       |
| `units`        | `{ px: { scopes, include }, … }`. A numeric token gets the first unit whose Figma scopes or globs apply. |

Globs follow Node's
[`path.matchesGlob`](https://nodejs.org/api/path.html#pathmatchesglobpath-pattern):
`*` matches one segment or part of one (as in `* surface`), and `**` matches
any number of segments.

Each token goes to the **first** block that includes it, in the order the
blocks are written, so put specific blocks before catch-alls such as
`include: ['**']`. Every token must be ignored or included by a block;
otherwise the pipeline fails.

| Block field        | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `include`          | Required. Globs for the tokens in this block.                             |
| `selector`         | Selector list, used as written. Default: `:root`.                         |
| `section`          | Heading comment: a string, or `(path) => string`.                         |
| `outputReferences` | When `false`, writes resolved values instead of `var()`. Default: `true`. |

## Tests

```sh
npm run test:node
```

Fixtures cover aliases, units, collision cases, and CSS
generation edge cases.
