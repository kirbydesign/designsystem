---
name: consumer
description: 'Build Angular UI with @kirbydesign/designsystem and optional @kirbydesign/extensions-angular. Use when choosing Kirby components or implementing forms, modals, navigation, lists, feedback, charts, illustrations, accessibility, formatting, or styling.'
---

# Kirby consumer

## Workflow

1. **Establish requirements.** Identify the installed Kirby, Angular and relevant extension versions
   and intended interaction.
   Finish when both are known; ask if a missing fact affects the choice.
2. **Choose components.** Load only the matching references below. Prefer configuring or composing
   Kirby components over recreating them. Account for every interaction with a covered component
   or an identified gap.
3. **Verify APIs.** Check every introduced export, selector, binding and token against installed
   declarations/styles. For gaps or compatibility mismatches, use the documentation index.
4. **Implement.** In new standalone code, import individual classes
   from `@kirbydesign/designsystem/<subpath>` or `@kirbydesign/extensions-angular/<subpath>`,
   including required template directives and Angular
   forms/router imports. Adapt examples to real data and labels. Retain existing forms conventions,
   module-based code and Angular syntax unless migration is requested.
5. **Validate.** Run existing focused build/type-check and tests. Check affected keyboard interaction,
   accessible names, focus, validation/error states, responsive layout and locale behavior.
   Report component choices, compatibility deviations, checks run and unresolved limitations.

## Load by task

| Task                                                                                | Reference                                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Text, amount or date input; single/multiple choice; searchable combobox; validation | [Forms](./references/forms.md)                               |
| Buttons versus links; action menus                                                  | [Actions](./references/actions.md)                           |
| Toasts, loading, skeleton placeholders, empty states or status feedback             | [Feedback](./references/feedback.md)                         |
| Dialog, drawer, confirmation, dismissal guard or routed wizard                      | [Modals](./references/modals.md)                             |
| Page/header, tabs, sidebar menu, segmented choices or navigation lifecycle          | [Pages and navigation](./references/pages-and-navigation.md) |
| Items, lists, cards, tables, load-on-demand or virtual scrolling                    | [Collections](./references/collections.md)                   |
| CSS/SCSS, colors, spacing, typography, responsive grids or custom UI                | [Styling](./references/styling.md)                           |
| Cross-cutting accessibility review                                                  | [Accessibility](./references/accessibility.md)               |
| Charts or chart configuration                                                       | [Charts](./references/charts.md)                             |
| Image banners or spot illustrations                                                 | [Illustrations](./references/illustrations.md)               |
| Extension amount, number, date/time, account or phone formatting                    | [Extension formatting](./references/extension-formatting.md) |
| Component/variant not covered by a recipe; guide sources and implementations        | [Documentation index](./references/documentation-index.md)   |

Load additional references only for branches the task actually reaches. Read the accessibility
reference for cross-cutting reviews; task-specific accessibility requirements live beside each recipe.

## Authority and uncertainty

- **Usage:** this skill is the source of truth for covered Kirby component choices and usage rules.
  Apply them directly; external examples do not override them.
- **Project requirements** govern business behavior, application policy and integration.
  Surface conflicts with this skill's UX/accessibility rules rather than silently inventing or
  overriding requirements.
- **Compatibility:** use the resolved package version, not a manifest range. Inspect the relevant
  secondary entry point and styles, including `@kirbydesign/core` for tokens.
  Angular extensions are a separate optional package; verify their installed version and peer
  compatibility rather than assuming core Kirby includes them.
- **Sources:** use the [documentation index](./references/documentation-index.md) only for maintenance,
  uncovered behavior or compatibility mismatches; covered rules require no external lookup.
- **Uncertainty:** report missing evidence or skill/installed-behavior conflicts and ask before
  introducing an unverified API or changing a usage rule. Ask when requirements affect component/flow
  selection or experimental adoption. Do not silently substitute newer APIs or upgrade packages.
