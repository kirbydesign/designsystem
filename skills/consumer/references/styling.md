# Kirby Styling Reference

## CSS Design Tokens

All tokens are emitted as CSS custom properties on `:root`. Use them directly in component styles.

| Category      | Pattern                       | Scale                                                                                                                            |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Spacing       | `--kirby-spacing-{key}`       | `xxxs`(4px) `xxs`(8px) `xs`(12px) `s`(16px) `m`(24px) `l`(32px) `xl`(40px) `xxl`(48px) `xxxl`(56px) `xxxxl`(64px) `xxxxxl`(72px) |
| Font size     | `--kirby-font-size-{key}`     | `xxs`(10px) `xs`(12px) `s`(14px) `n`(16px) `m`(18px) `l`(22px) `xl`(32px) `xxl`(40px) `xxxl`(56px) `xxxxl`(72px)                 |
| Font weight   | `--kirby-font-weight-{key}`   | `light`(300) `normal`(400) `medium`(500) `bold`(700) `black`(900)                                                                |
| Line height   | `--kirby-line-height-{key}`   | `xxs`(11px) `xs`(16px) `s`(20px) `m/n`(24px) `l`(28px) `xl`(38px)                                                                |
| Border radius | `--kirby-border-radius-{key}` | —                                                                                                                                |
| Elevation     | `--kirby-elevation-{key}`     | —                                                                                                                                |
| Z-index       | `--kirby-z-index-{key}`       | —                                                                                                                                |

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

Link to https://cookbook.kirby.design/#/home/showcase/typography
