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

See [references/components.md](references/components.md) for the full component reference including usage guidance.

## Styling

See [references/styling.md](references/styling.md) for CSS design tokens, SCSS utilities, and typography classes.

## Usage Guidelines

1. Use `attentionLevel` on buttons: level 1 = primary CTA, level 2 = secondary, level 3 = tertiary/ghost.
2. Use `kirby-item` with `kirby-icon` for icon+text list rows.
3. Use `kirby-card` for framed/elevated content blocks.
4. For loading states, prefer `kirby-loading-overlay` or `kirby-spinner`.

## Anti-patterns

- Importing from `@kirbydesign/designsystem` top-level barrel → use the per-component subpath (e.g. `@kirbydesign/designsystem/button`)
- Using `KirbyModule` → import individual component classes directly
- Overriding Kirby CSS custom properties with hardcoded values → use the `--kirby-*` token that maps to the desired value
- Creating custom icon+text rows without `kirby-item` → use `kirby-item` with a slotted `kirby-icon`
- Guessing a component's inputs or selectors → check the Cookbook or the installed package under `node_modules/@kirbydesign/designsystem/<subpath>`
