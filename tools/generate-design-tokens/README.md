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

CI runs this command on every pull request and fails if the result differs
from the committed CSS, so the committed JSON, generator, and config always
reproduce it byte-for-byte. Regenerate and commit the CSS whenever one of
them changes.

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

[`design-tokens.config.mjs`](../../design-tokens.config.mjs) sets a `prefix`,
optional `units`, and an ordered list of `rules`. For each token, the first
matching rule wins, so put specific rules before general ones. Every token must
be matched by a rule; otherwise, the pipeline fails.

| Rule field         | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `id`               | Unique name for the rule.                                                                  |
| `match`            | Path pattern.                                                                              |
| `ignore`           | If `true`, the token is left out of CSS. Don't set any fields other than `id` and `match`. |
| `variable`         | Required. CSS variable name, without `--`.                                                 |
| `output`           | Required. CSS file to write.                                                               |
| `selector`         | Selector list. Default: `:root`.                                                           |
| `section`          | Optional heading comment for the generated CSS.                                            |
| `outputReferences` | When `false`, writes resolved values instead of `var()`. Default: `true`.                  |

Patterns match Figma path segments separated by `/`:

- Literal text matches exactly.
- `*` matches one segment.
- `{name}` captures all or part of a segment, as in `{surface} surface`.
- A final `**` matches one or more segments and captures them as `{rest}`.

Templates can use `{prefix}`, `{path}` (the full path), `{rest}`, and any
captures from the rule's pattern. Inserted values are lowercased and joined
with dashes.

Each key in `units` is a unit, such as `px` or `%`. A unit applies to numeric
tokens that match its Figma `scopes` or its `paths` patterns.

## Tests

```sh
npm run test:node
```

Fixtures cover aliases, units, collision cases, and CSS
generation edge cases.
