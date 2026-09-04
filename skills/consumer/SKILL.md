---
name: consumer
description: 'Use when working on Angular UI that uses Kirby; kirby-* elements, @kirbydesign/designsystem imports, modals, toasts, buttons, forms, lists, colors, or icons'
---

# Kirby Design System - Component Library

Use this skill when helping with UI components, markup, or styling in Angular microfrontends that use the Kirby design system (`@kirbydesign/designsystem`).

## Official Documentation

- Kirby Cookbook: https://cookbook.kirby.design/#/home/intro
- Use the Cookbook for API details, accessibility guidance, and rendered behavior. Use the [Cookbook source examples](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples) for complete Angular implementations.
- For version-matched source, use `https://github.com/kirbydesign/designsystem/tree/<kirby-version>/apps/cookbook/src/app/examples/<component>-example` and replace `<kirby-version>` with the consumer application's installed Kirby version when a matching tag exists.
- Prefer the installed package (`node_modules/@kirbydesign/designsystem/<subpath>`) for the consumer application's version when it differs from the Cookbook release.

## Component Reference

Prefer standalone component classes imported from per-component secondary entry points
(`@kirbydesign/designsystem/<name>`) in new consumer code. Avoid the top-level barrel and
`KirbyModule`; older Cookbook examples may still contain those patterns.

See [references/components.md](references/components.md) for the full component reference including usage guidance.

## Examples

When creating Kirby markup, imports, forms, lists, modals, loading states, or styling, read
[references/examples.md](references/examples.md) for copy-ready patterns and their Cookbook source links.

## Styling

See [references/styling.md](references/styling.md) for CSS design tokens, SCSS utilities, and typography classes.

## Usage Guidance

For component-specific usage rules, read [references/components.md](references/components.md).
For copy-ready markup and imports, read [references/examples.md](references/examples.md).
For styling tokens and utilities, read [references/styling.md](references/styling.md).

## Anti-patterns

- Importing from `@kirbydesign/designsystem` top-level barrel in new consumer code → use the per-component subpath (e.g. `@kirbydesign/designsystem/button`)
- Using `KirbyModule` in new consumer code → import individual component classes directly
- Overriding Kirby CSS custom properties with hardcoded values → use the `--kirby-*` token that maps to the desired value
- Creating custom icon+text rows without `kirby-item` → use `kirby-item` with a slotted `kirby-icon`
- Guessing a component's inputs or selectors → check the Cookbook or the installed package under `node_modules/@kirbydesign/designsystem/<subpath>`
