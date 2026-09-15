# Kirby Styling Reference

## CSS Design Tokens

All tokens are emitted as CSS custom properties on `:root`. Use them directly in component styles.

| Category      | Pattern                       | Scale                                                                    |
| ------------- | ----------------------------- | ------------------------------------------------------------------------ |
| Spacing       | `--kirby-spacing-{key}`       | `xxxxs` `xxxs` `xxs` `xs` `s` `m` `l` `xl` `xxl` `xxxl` `xxxxl` `xxxxxl` |
| Font size     | `--kirby-font-size-{key}`     | `xxs` `xs` `s` `n` `m` `l` `xl` `xxl` `xxxl` `xxxxl`                     |
| Font weight   | `--kirby-font-weight-{key}`   | `light` `normal` `medium` `bold` `black`                                 |
| Line height   | `--kirby-line-height-{key}`   | `xxs` `xs` `s` `n` `m` `l` `xl`                                          |
| Border radius | `--kirby-border-radius-{key}` | —                                                                        |
| Elevation     | `--kirby-elevation-{key}`     | —                                                                        |
| Z-index       | `--kirby-z-index-{key}`       | —                                                                        |

## SCSS Utilities

```scss
@use '@kirbydesign/designsystem/scss/utils' as *;

@include media('>small') { … }   // > 632px
@include media('>medium') { … }  // > 768px
@include media('>large') { … }   // > 992px
```

Breakpoints: `xsmall` 320px · `small` 632px · `medium` 768px · `large` 992px · `xlarge` 1440px

## Typography CSS Classes

Apply to any element for consistent text styles (no SCSS import needed):

`kirby-text-display-1/2/3`, `kirby-text-xlarge` (`<h1>`), `kirby-text-large` (`<h2>`), `kirby-text-medium` (`<h3>`), `kirby-text-normal-bold` (`<h4>`), `kirby-text-normal` (`<p>`), `kirby-text-small`, `kirby-text-small-light`, `kirby-text-xsmall`, `kirby-text-xxsmall`, `kirby-text-bold`

Link to https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/showcase/typography-showcase
