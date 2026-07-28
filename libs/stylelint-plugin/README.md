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

## License

[MIT](./LICENSE)
