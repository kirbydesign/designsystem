# @kirbydesign/stylelint-plugin

Stylelint rules for consumers of the [Kirby Design System](https://cookbook.kirby.design).

This package is a [Stylelint plugin](https://stylelint.io/user-guide/configure#plugins). It ships one or more rules under the `kirby/` namespace to help you keep your stylesheets aligned with Kirby conventions.

## Rules

| Rule                                                           | Description                                                        | Autofix |
| -------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| [`kirby/use-design-tokens`](./rules/use-design-tokens/README.md) | Require Kirby design tokens instead of the deprecated SCSS functions. | Yes     |

## Installation

```sh
npm install --save-dev @kirbydesign/stylelint-plugin stylelint
```

`stylelint` is a peer dependency (`^16.0.0`), so install it alongside the plugin if you haven't already.

## Usage

Add the plugin to your Stylelint configuration and enable the rules you want:

```json
{
  "plugins": ["@kirbydesign/stylelint-plugin"],
  "rules": {
    "kirby/use-design-tokens": true
  }
}
```

If you lint SCSS, remember to configure a SCSS-aware syntax, e.g. `postcss-scss` via [`stylelint-config-standard-scss`](https://www.npmjs.com/package/stylelint-config-standard-scss).

Then run Stylelint, optionally with `--fix` to apply the safe autofixes:

```sh
npx stylelint "**/*.scss" --fix
```

## Terminology

- **Rule namespace** — the `kirby/` prefix scoping every rule this plugin provides (e.g. `kirby/use-design-tokens`), keeping them distinct from Stylelint's built-in rules.
- **Manual-migration case** — a legacy SCSS accessor usage the rule can flag but cannot safely autofix: rewriting it to a token would break Sass math (`size('m') * 2`), the argument is a SCSS variable, or no token equivalent exists (`get-shadow-size()`). These are reported and the source is left untouched.

For the design-system-wide terms (_design token_, _legacy SCSS accessor_), see the repo-root [`CONTEXT.md`](https://github.com/kirbydesign/designsystem/blob/develop/CONTEXT.md).

## License

[MIT](./LICENSE)
