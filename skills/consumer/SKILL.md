---
name: consumer
description: 'Build Angular UI with @kirbydesign/designsystem in applications and hosted microfrontends. Use when choosing Kirby components, integrating existing UI wrappers, or implementing forms, modals, navigation, lists, feedback, charts, accessibility, localization, or styling.'
---

# Kirby consumer

Choose and compose Kirby components from documented behavior, then verify the implementation
against the application's installed version. This skill includes portable recipes; a Kirby
repository checkout is not required. Keep this folder and its references together when installing.

## Workflow

1. **Establish constraints.** Read the consuming app's instructions, nearby UI, package manifest,
   lockfile, and, when available, installed Kirby package metadata. Identify the resolved Kirby and
   Angular versions, required interaction, and existing form/routing conventions. Finish when the
   relevant versions and intended behavior are known; ask if a missing fact affects the choice.
   For hosted microfrontends, also read [Consumer context](./references/consumer-context.md).
2. **Choose the recipe.** Read only the matching reference below, using its decision table or setup steps.
   Prefer using, configuring, or composing existing Kirby components over recreating them. Finish
   when each requested interaction has a documented component or an explicitly identified gap.
3. **Verify the API.** Check the selected exports, selectors, bindings, and tokens in the installed
   package's declarations/styles. Reuse the bundled example when it fits. For an uncovered behavior
   or version difference, fetch only the relevant version-matched Cookbook section and example.
   Finish when every API being introduced has evidence; apply the uncertainty policy below otherwise.
4. **Implement.** Reuse the app's established UI wrappers and architecture where they fit the task.
   In new standalone code, import individual classes
   from `@kirbydesign/designsystem/<subpath>`, including required template directives and Angular
   forms/router imports. Adapt examples to the app's real data and translations. Preserve existing
   module-based code and Angular syntax unless migration is requested; the examples are component
   anatomy, not a requirement to adopt newer Angular APIs or hardcoded English strings.
5. **Verify the outcome.** Use the app's existing focused build/type-check and tests. Check keyboard
   interaction, accessible names, focus, validation/error states, responsive layout, and locale
   where affected. Report the component choice, version-specific deviations, checks actually run,
   and unresolved limitations. A successful build alone does not establish accessibility.

## Load by task

| Task                                                                         | Reference                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Text, amount or date input; single/multiple choice; validation               | [Forms](./references/forms.md)                               |
| Buttons versus links; action menus                                           | [Actions](./references/actions.md)                           |
| Toasts, loading, empty states or status feedback                             | [Feedback](./references/feedback.md)                         |
| Dialog, drawer, confirmation, dismissal guard or routed wizard               | [Modals](./references/modals.md)                             |
| Page/header, tabs, segmented choices or navigation lifecycle                 | [Pages and navigation](./references/pages-and-navigation.md) |
| Items, lists, cards, tables, load-on-demand or virtual scrolling             | [Collections](./references/collections.md)                   |
| CSS/SCSS, colors, spacing, typography, responsive grids or custom UI         | [Styling](./references/styling.md)                           |
| Bootstrap, providers or global styles                                        | [Setup](./references/setup.md)                               |
| Locale, translations, amount/date/time formatting                            | [Localization](./references/localization.md)                 |
| Cross-cutting accessibility review                                           | [Accessibility](./references/accessibility.md)               |
| Charts or chart configuration                                                | [Charts](./references/charts.md)                             |
| Component/variant not covered by a recipe; guide sources and implementations | [Documentation index](./references/documentation-index.md)   |
| Hosted microfrontend, shared dependencies, app wrappers or integration tests | [Consumer context](./references/consumer-context.md)         |

Load additional references only for branches the task actually reaches. Read the accessibility
reference for cross-cutting reviews; task-specific accessibility requirements live beside each recipe.

## Evidence and uncertainty

- **Project requirements** govern business behavior and corporate policy. The Cookbook is not a
  corporate policy document. Surface conflicts with its UX/accessibility guidance rather than
  silently inventing or overriding requirements.
- **Installed APIs** determine compatibility. Use the resolved package version, not just a manifest
  range. Inspect only the relevant secondary entry point and styles, including `@kirbydesign/core`
  for tokens. Account for workspace/pnpm package locations when needed. For shared runtime
  dependencies, also verify the host/platform compatibility constraints in the consumer context.
- **Cookbook guidance** determines intended usage. Bundled recipes are based on the
  [Kirby Cookbook](https://cookbook.kirby.design). Consult the linked sources for details beyond
  the recipes.
- **Version-matched lookup:** substitute `v<resolved-kirby-version>` for `develop` in a source URL
  only if that tag exists. Use showcase HTML for usage/accessibility, showcase TypeScript for API
  tables, and examples for implementation. Current [live documentation](https://cookbook.kirby.design)
  and `develop` are discovery aids, not proof that an older package supports an API.
- **Missing evidence:** if dependencies, documentation, a tag, or network access are unavailable,
  state what could not be verified. Ask for the version, relevant declarations/docs, or a decision
  before introducing an unverified API. Do not silently substitute the latest API or upgrade packages.
- **Ambiguous behavior:** ask when the answer changes the component or flow, such as single versus
  multiple selection, immediate toggle versus submitted choice, required modal deep links, unsaved
  changes on dismissal, date/timezone rules, or adoption of an experimental API.
