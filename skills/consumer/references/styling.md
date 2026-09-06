# Kirby Styling Reference

## CSS Design Tokens

All tokens are emitted as CSS custom properties on `:root`. Use them directly in component styles.

| Category      | Pattern                       | Scale                                                                                                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spacing       | `--kirby-spacing-{key}`       | `xxxxs`(2px) `xxxs`(4px) `xxs`(8px) `xs`(12px) `s`(16px) `m`(24px) `l`(32px) `xl`(40px) `xxl`(48px) `xxxl`(56px) `xxxxl`(64px) `xxxxxl`(72px)                                                                                                                                                                                           |
| Font size     | `--kirby-font-size-{key}`     | `xxs`(clamp(10px, 0.625rem, 20px)) `xs`(clamp(11px, 0.75rem, 24px)) `s`(clamp(12px, 0.875rem, 28px)) `n`(clamp(13px, 1rem, 32px)) `m`(clamp(14px, 1.125rem, 35px)) `l`(clamp(19px, 1.375rem, 38px)) `xl`(clamp(26px, 2rem, 41px)) `xxl`(clamp(32px, 2.5rem, 46px)) `xxxl`(clamp(45px, 3.5rem, 56px)) `xxxxl`(clamp(56px, 4.5rem, 72px)) |
| Font weight   | `--kirby-font-weight-{key}`   | `light`(300) `normal`(400) `medium`(500) `bold`(700) `black`(900)                                                                                                                                                                                                                                                                       |
| Line height   | `--kirby-line-height-{key}`   | `xxs`(1.1) `xs`(1.3334) `s`(1.4286) `n`(1.5) `m`(1.3334) `l`(1.2727) `xl`(1.1875)                                                                                                                                                                                                                                                       |
| Border radius | `--kirby-border-radius-{key}` | —                                                                                                                                                                                                                                                                                                                                       |
| Elevation     | `--kirby-elevation-{key}`     | —                                                                                                                                                                                                                                                                                                                                       |
| Z-index       | `--kirby-z-index-{key}`       | —                                                                                                                                                                                                                                                                                                                                       |

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
