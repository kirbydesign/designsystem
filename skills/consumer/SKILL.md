---
name: kirby-design-system
description: 'Use when working on Angular UI that uses Kirby; kirby-* elements, @kirbydesign/designsystem imports, modals, toasts, buttons, forms, lists, colors, or icons'
model: claude-sonnet-4.6
---

# Kirby Design System - Component Library

Use this skill when helping with UI components, markup, or styling in Angular microfrontends that use the Kirby design system (`@kirbydesign/designsystem`).

## Official Documentation

- Kirby Cookbook: https://cookbook.kirby.design/#/home/intro
- Always check the Cookbook component docs before creating custom markup or styles, and when unsure about a selector, input, or export, check the installed package (`node_modules/@kirbydesign/designsystem/<subpath>`) or the Cookbook instead of guessing.

## Component Reference

All components are standalone and imported from a per-component subpath
(`@kirbydesign/designsystem/<name>`). Always use these secondary entry points — never the
top-level barrel, and never `KirbyModule`.

Import path prefixes used in the table below:

- `ds/` → `@kirbydesign/designsystem/`
- `ext/` → `@kirbydesign/extensions-angular/`

### Components Table

Key inputs only — see [Cookbook](https://cookbook.kirby.design/#/home/showcase/{component-name}) for full API.

| Selector                                  | Class(es)                    | Key Inputs                                                                     | Import                 |
| ----------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------ | ---------------------- |
| `button[kirby-button]`, `a[kirby-button]` | `ButtonComponent`            | `attentionLevel`, `themeColor`, `expand`, `size`                               | `ds/button`            |
| `[kirbyAccordion]`, `kirby-accordion`     | `AccordionDirective`         | `headingLevel`                                                                 | `ds/accordion`         |
| `kirby-accordion-item`                    | `AccordionItemComponent`     | `title`, `isExpanded`, `isDisabled`                                            | `ds/accordion`         |
| `kirby-action-group`                      | `ActionGroupComponent`       | `visibleActions`, `align`                                                      | `ds/action-group`      |
| `kirby-avatar`                            | `AvatarComponent`            | `imageSrc`, `altText`, `size`, `themeColor`                                    | `ds/avatar`            |
| `kirby-badge`                             | `BadgeComponent`             | `text`, `themeColor`                                                           | `ds/badge`             |
| `kirby-card`                              | `CardComponent`              | `title`, `hasPadding`, `variant`                                               | `ds/card`              |
| `kirby-card-header`                       | `CardHeaderComponent`        | `title`, `subtitle`                                                            | `ds/card`              |
| `kirby-card-footer`                       | `CardFooterComponent`        | `hasPadding`                                                                   | `ds/card`              |
| `kirby-checkbox`                          | `CheckboxComponent`          | `checked`, `text`, `disabled`                                                  | `ds/checkbox`          |
| `th[sortable]`                            | `TableSortableComponent`     | `sortable`, `active`, `sortDirection`                                          | `ds/data-table`        |
| `kirby-divider`                           | `DividerComponent`           | `hasMargin`                                                                    | `ds/divider`           |
| `kirby-dropdown`                          | `DropdownComponent`          | `items`, `selectedIndex`, `placeholder`, `disabled`, `hasError`                | `ds/dropdown`          |
| `kirby-empty-state`                       | `EmptyStateComponent`        | `iconName`, `title`, `subtitle`                                                | `ds/empty-state`       |
| `kirby-flag`                              | `FlagComponent`              | `themeColor`                                                                   | `ds/flag`              |
| `kirby-form-field`                        | `FormFieldComponent`         | `label`, `message`                                                             | `ds/form-field`        |
| `input[kirby-input]`                      | `InputComponent`             | `type`, `hasError`, `value`                                                    | `ds/form-field`        |
| `textarea[kirby-textarea]`                | `TextareaComponent`          | `value`, `hasError`                                                            | `ds/form-field`        |
| `kirby-header`                            | `HeaderComponent`            | `title`, `subtitle1`, `subtitle2`, `value`                                     | `ds/header`            |
| `kirby-icon`                              | `IconComponent`              | `name`, `size`                                                                 | `ds/icon`              |
| `kirby-item`                              | `ItemComponent`              | `disabled`, `selected`, `disclosure`                                           | `ds/item`              |
| `kirby-label`                             | `LabelComponent`             | `direction`                                                                    | `ds/item`              |
| `kirby-item-group`                        | `ItemGroupComponent`         | —                                                                              | `ds/item-group`        |
| `kirby-item-sliding`                      | `ItemSlidingComponent`       | `swipeActions`, `side`                                                         | `ds/item-sliding`      |
| `kirby-list`                              | `ListComponent`              | `items`, `showDivider`, `markSelectedRow`                                      | `ds/list`              |
| `kirby-loading-overlay`                   | `LoadingOverlayComponent`    | `isLoading`                                                                    | `ds/loading-overlay`   |
| `kirby-modal`                             | `ModalComponent`             | `isOpen`, `trigger`, `size`, `canDismiss`                                      | `ds/modal`             |
| `kirby-modal-footer`                      | `ModalFooterComponent`       | `snapToKeyboard`, `themeColor`                                                 | `ds/modal`             |
| `kirby-alert`                             | `AlertComponent`             | `title`, `message`, `okBtn`, `cancelBtn`                                       | `ds/modal`             |
| `kirby-action-sheet`                      | `ActionSheetComponent`       | `items`, `cancelButtonText`                                                    | `ds/modal`             |
| `ModalController` (service)               | `ModalController`            | `showModal(config, cb?)`, `navigateToModal(path)`, `navigateWithinModal(path)` | `ds/modal`             |
| `kirby-page`                              | `PageComponent`              | `title`, `defaultBackHref`, `hideBackButton`                                   | `ds/page`              |
| `kirby-page-footer`                       | `PageFooterComponent`        | `hasPadding`                                                                   | `ds/page`              |
| `kirby-popover`                           | `PopoverComponent`           | `target`                                                                       | `ds/popover`           |
| `kirby-progress-circle`                   | `ProgressCircleComponent`    | `value`, `themeColor`                                                          | `ds/progress-circle`   |
| `kirby-radio`                             | `RadioComponent`             | `value`, `text`, `disabled`                                                    | `ds/radio`             |
| `kirby-radio-group`                       | `RadioGroupComponent`        | `items`, `value`, `disabled`                                                   | `ds/radio`             |
| `kirby-range`                             | `RangeComponent`             | `min`, `max`, `value`, `step`                                                  | `ds/range`             |
| `kirby-section-header`                    | `SectionHeaderComponent`     | —                                                                              | `ds/section-header`    |
| `kirby-segmented-control`                 | `SegmentedControlComponent`  | `items`, `selectedIndex`, `value`                                              | `ds/segmented-control` |
| `kirby-slides`                            | `SlidesComponent`            | `slides`, `title`                                                              | `ds/slide`             |
| `kirby-slide-button`                      | `SlideButtonComponent`       | `text`, `expand`                                                               | `ds/slide-button`      |
| `kirby-spinner`                           | `SpinnerComponent`           | —                                                                              | `ds/spinner`           |
| `kirby-tab-navigation`                    | `TabNavigationComponent`     | `selectedIndex`                                                                | `ds/tab-navigation`    |
| `kirby-tab-navigation-item`               | `TabNavigationItemComponent` | `label`                                                                        | `ds/tab-navigation`    |
| `kirby-tab-bar`                           | `TabsComponent`              | —                                                                              | `ds/tabs`              |
| `kirby-tab-button`                        | `TabButtonComponent`         | `tab`                                                                          | `ds/tabs`              |
| `ToastController` (service)               | `ToastController`            | —                                                                              | `ds/toast`             |
| `kirby-toggle`                            | `ToggleComponent`            | `checked`, `disabled`                                                          | `ds/toggle`            |
| `kirby-toggle-button`                     | `ToggleButtonComponent`      | `checked`                                                                      | `ds/toggle-button`     |
| `kirby-x-image-banner`                    | `ImageBannerComponent`       | `title`, `imagePath`, `bodyText`, `actionButtonText`                           | `ext/image-banner`     |
| `kirby-x-skeleton-loader`                 | `SkeletonLoaderComponent`    | `theme`, `shape`                                                               | `ext/skeleton-loader`  |
| `kirby-x-combobox`                        | `ComboboxComponent`          | `items`, `selectedItem`, `placeholder`, `disabled`, `hasError`                 | `ext/combobox`         |

## CSS Design Tokens

All tokens are emitted as CSS custom properties on `:root`. Use them directly in component styles.

| Category            | Pattern                                                                                | Scale                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Brand colors        | `--kirby-{primary\|secondary\|tertiary}`                                               | —                                                                                                                                |
| Notification colors | `--kirby-{success\|warning\|danger}`                                                   | —                                                                                                                                |
| System colors       | `--kirby-{background-color\|white\|light\|semi-light\|medium\|semi-dark\|dark\|black}` | —                                                                                                                                |
| Text colors         | `--kirby-text-color-{black\|semi-dark\|white\|danger\|positive\|negative}`             | —                                                                                                                                |
| Decoration colors   | `--kirby-decoration-color-{blue\|green\|purple\|red\|yellow\|orange}-{10–90}`          | —                                                                                                                                |
| Spacing             | `--kirby-spacing-{key}`                                                                | `xxxs`(4px) `xxs`(8px) `xs`(12px) `s`(16px) `m`(24px) `l`(32px) `xl`(40px) `xxl`(48px) `xxxl`(56px) `xxxxl`(64px) `xxxxxl`(72px) |
| Font size           | `--kirby-font-size-{key}`                                                              | `xxs`(10px) `xs`(12px) `s`(14px) `n`(16px) `m`(18px) `l`(22px) `xl`(32px) `xxl`(40px) `xxxl`(56px) `xxxxl`(72px)                 |
| Font weight         | `--kirby-font-weight-{key}`                                                            | `light`(300) `normal`(400) `medium`(500) `bold`(700) `black`(900)                                                                |
| Line height         | `--kirby-line-height-{key}`                                                            | `xxs`(11px) `xs`(16px) `s`(20px) `m/n`(24px) `l`(28px) `xl`(38px)                                                                |
| Border radius       | `--kirby-border-radius-{key}`                                                          | —                                                                                                                                |
| Elevation           | `--kirby-elevation-{key}`                                                              | —                                                                                                                                |
| Z-index             | `--kirby-z-index-{key}`                                                                | —                                                                                                                                |

## SCSS Utilities

Import the utils barrel to access SCSS functions and the `include-media` mixin:

```scss
@use '@kirbydesign/designsystem/scss/utils' as *;
```

Key functions: `size($key)`, `font-size($key)`, `line-height($key)`, `font-weight($key)`, `get-color($variant)`, `get-text-color($variant)`, `get-decoration-color($variant, $shade)`, `border-radius($value)`, `get-elevation($value)`.

Responsive breakpoints via `include-media`:

```scss
@include media('>small') { … }   // > 632px
@include media('>medium') { … }  // > 768px
@include media('>large') { … }   // > 992px
```

Breakpoints: `xsmall` 320px · `small` 632px · `medium` 768px · `large` 992px · `xlarge` 1440px

## Typography CSS Classes

Apply to any element for consistent text styles (no SCSS import needed):

`kirby-text-display-1/2/3`, `kirby-text-xlarge` (`<h1>`), `kirby-text-large` (`<h2>`), `kirby-text-medium` (`<h3>`), `kirby-text-normal-bold` (`<h4>`), `kirby-text-normal` (`<p>`), `kirby-text-small`, `kirby-text-small-light`, `kirby-text-xsmall`, `kirby-text-xxsmall`, `kirby-text-bold`

## Usage Guidelines

1. Use `attentionLevel` on buttons: level 1 = primary CTA, level 2 = secondary, level 3 = tertiary/ghost.
2. Use `kirby-item` with `kirby-icon` for icon+text list rows.
3. Use `kirby-card` for framed/elevated content blocks.
4. Use `kirby-modal-footer` for action buttons in modals.
5. For loading states, prefer `kirby-loading-overlay` or `kirby-spinner`.

## Anti-patterns

- Importing from `@kirbydesign/designsystem` top-level barrel → use the per-component subpath (e.g. `@kirbydesign/designsystem/button`)
- Using `KirbyModule` → import individual component classes directly
- Overriding Kirby CSS custom properties with hardcoded values → use the `--kirby-*` token that maps to the desired value
- Creating custom icon+text rows without `kirby-item` → use `kirby-item` with a slotted `kirby-icon`
- Guessing a component's inputs or selectors → check the Cookbook or the installed package under `node_modules/@kirbydesign/designsystem/<subpath>`
