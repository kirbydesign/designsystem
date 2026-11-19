# Evaluation and maintenance

These instructions are for skill maintainers, not part of the consumer UI workflow.

Keep the core as a workflow and put branch-specific examples in references. Update a recipe and its
source together when documented behavior changes. Review the
[evaluation scenarios](./scenarios.json) after edits; they are behavioral acceptance cases,
not evidence that an agent has passed them. Measure token use and decision accuracy on representative
consumer tasks before claiming a cost reduction.

Write covered usage rules directly in the skill. Keep fallback source directories in the
[documentation index](../references/documentation-index.md) and recipe-specific provenance here,
not in usage recipes. Sources support maintenance and uncovered APIs, not a second authority.
Resolve source changes into an explicit rule update and its evaluation cases; keep installed-API
compatibility checks separate from intended-usage decisions.

## Evaluating generated code

Run generation tasks in a consumer fixture with known package versions and existing checks.
Evaluate the implementation, not just its explanation or reference selection.
For each applicable check below and each scenario's expected outcome, record **passed**, **failed**
or **not run**, with command output, test results or observed behavior as evidence:

- Existing build/type-check, including strict Angular template checking where supported.
- Component selection and API/type accuracy against the installed packages.
- Relevant keyboard, focus, accessible-name, validation and responsive behavior.
- Kirby token/public styling API usage and any unnecessary custom CSS or wrapper components.

Compilation alone does not establish accessibility or visual correctness. For missing dependencies
or evidence, evaluate the reported limitation rather than rewarding speculative code.
Compare old and revised skill runs using the same tasks, package versions, agent configuration and
checks; repeat runs before attributing differences to the wording.

## Recipe provenance

The index identifies component showcase/example directories and extension entry points.
The paths below retain more precise maintenance pointers without adding them to runtime lookups.
All Cookbook paths are relative to `apps/cookbook/src/app/` in the
[Kirby repository](https://github.com/kirbydesign/designsystem/tree/develop).
Use the index's version-matching policy when investigating an installed release.

| Recipe               | Specific example sources                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions              | `examples/menu-example/examples/customButton.ts`, `examples/menu-example/examples/selectable.ts`                                                                                                                                                                                                                                                                                                                                                                                    |
| Forms                | `examples/form-field-example/examples/input/label-message.ts`, `examples/form-field-example/examples/input/error.ts`, `examples/form-field-example/examples/input/reactive-forms.ts`, `examples/form-field-example/examples/input/decimal-mask.ts`, `examples/form-field-example/examples/input/date.ts`, `examples/form-field-example/examples/input/date-native.ts`, `examples/form-field-example/examples/textarea/counter.ts`, `examples/dropdown-example/examples/ng-forms.ts` |
| Modals               | `examples/modal-example/modal-component-example.component.ts`, `examples/modal-example/modal-example-outlet.component.ts`, `examples/modal-example/modal-route-example/`                                                                                                                                                                                                                                                                                                            |
| Pages and navigation | `examples/header-example/examples/default.ts`, `examples/tab-navigation-example/tab-navigation-example.component.ts`, `showcase/page-tab-navigation-showcase/tab-navigation-showcase.component.html`                                                                                                                                                                                                                                                                                |
| Collections          | `examples/list-example/examples/selectable-items.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Charts               | `examples/charts-example/examples/config/stock-config/chart-example-config-base-stock.component.ts`                                                                                                                                                                                                                                                                                                                                                                                 |

Stock chart helper stability is declared in
`libs/designsystem/chart/src/chart-config/chart-stock-config/chart-stock-config.ts`.
For feedback, styling and accessibility, the index's showcase/guide paths identify the source;
there is no separate recipe implementation to track.

### Extension provenance

Paths are relative to `libs/extensions/angular/`. Each component's directory contains its
implementation and stories; these pointers identify additional contracts used by the recipes:

| Recipe             | Specific sources                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Combobox           | `combobox/src/combobox-item-template.directive.ts`                                                                                                                                                     |
| Sidebar            | `sidebar-menu/src/models/`, `sidebar-menu/src/services/menu-state/menu-state.service.ts`, `sidebar-menu/src/public-components/sidebar/sidebar.component.stories.ts`                                    |
| Spot illustrations | `spot-illustration/src/spot-illustrations.ts`                                                                                                                                                          |
| Amount             | `localization/src/amount/amount.pipe.ts`, `localization/src/amount/amount.service.ts`, `localization/src/amount/amount-service-formatter.ts`, `localization/src/amount/amount.stories.ts`              |
| Number             | `localization/src/number/format-number.pipe.ts`, `localization/src/number/format-number.service.ts`, `localization/src/number/format-number.stories.ts`                                                |
| Date               | `localization/src/date-time/date-only/date-only.pipe.ts`, `localization/src/date-time/date-only/date-only.stories.ts`                                                                                  |
| Time               | `localization/src/date-time/time-only/time-only.pipe.ts`, `localization/src/date-time/time-only/time-only.stories.ts`                                                                                  |
| Time-or-date       | `localization/src/date-time/time-or-date/time-or-date.pipe.ts`, `localization/src/date-time/time-or-date/time-or-date.stories.ts`, `localization/src/date-time/abstract-timezone-compensating.pipe.ts` |
| Account            | `localization/src/account-number/account-number.pipe.ts`, `localization/src/account-number/account-number-service-formatter.ts`, `localization/src/account-number/account-number.stories.ts`           |
| Phone              | `localization/src/phone-number/phone-number.pipe.ts`, `localization/src/phone-number/phone-number.service.ts`, `localization/src/phone-number/phone-number.stories.ts`                                 |
