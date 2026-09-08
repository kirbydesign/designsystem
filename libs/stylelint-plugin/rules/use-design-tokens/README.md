# kirby/use-design-tokens

Require Kirby design tokens instead of the deprecated SCSS functions.

<!-- prettier-ignore -->
```scss
.a { color: get-color('primary'); }
/**         ↑
 * SCSS functions like this should be design tokens */
```

The Kirby Design System is moving away from SCSS accessor functions (`get-color()`, `size()`, `font-size()`, …) towards [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) — the design tokens exposed as `var(--kirby-*)`. This rule flags the deprecated functions and, where it is safe, rewrites them to the equivalent design token.

## Options

### `true`

The following patterns are considered problems:

<!-- prettier-ignore -->
```scss
.a { color: get-color('primary'); }
```

<!-- prettier-ignore -->
```scss
.a { padding: utils.size('m'); }
```

<!-- prettier-ignore -->
```scss
.a { font-size: utils.font-size('n'); }
```

The following patterns are _not_ considered problems:

<!-- prettier-ignore -->
```scss
.a { color: var(--kirby-primary); }
```

<!-- prettier-ignore -->
```scss
.a { padding: var(--kirby-spacing-m); }
```

## Autofix

This rule is autofixable with the [`--fix` option](https://stylelint.io/user-guide/options#fix).

Autofix rewrites the **safe** cases to `var(--kirby-*)`. Some usages cannot be resolved at lint time and are **reported but left untouched** for you to migrate by hand:

- a function used inside a SCSS arithmetic expression, e.g. `size('m') * 2` — rewriting it to `var(--kirby-spacing-m) * 2` would break Sass math; convert the whole expression to a CSS `calc()` instead;
- a function whose argument is a SCSS variable, e.g. `size($my-var)` — the token name cannot be resolved statically;
- `get-color(..., $getValueOnly: true)`, which returns a raw value for SCSS colour manipulation;
- functions with no direct token equivalent, e.g. `get-page-content-max-width()` and `get-shadow-size()`.

## Message arguments

This rule supports up to 2 [message arguments](https://stylelint.io/developer-guide/plugins#stylelintutilsrulemessages):

- for a fixable problem: the deprecated function call and its expected design token, e.g. `get-color('primary')` and `var(--kirby-primary)`;
- for a manual-migration problem: the deprecated function call and the reason it cannot be fixed automatically.
