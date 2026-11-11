# Documentation index

Use this index for subjects/variants not covered by the bundled recipes. Fetch only the relevant
source, not the whole Cookbook. This inventory covers the Cookbook's showcase directories
and guides, including hidden/legacy subjects for maintenance rather than endorsement.

## Resolve a source

The source root is
`https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/`.
Append the exact directory below. For raw files, use
`https://raw.githubusercontent.com/kirbydesign/designsystem/develop/apps/cookbook/src/app/`
and the directory's actual filename. Apply the main skill's version-matching policy before using
these APIs in another version.

In the table, a showcase key means `showcase/<key>/`; an example key means `examples/<key>/`.
Read showcase `.html` for decisions/accessibility, `.ts` for API tables, and example `.ts` plus
associated `.html`/`.scss` for implementation. Directory names are not selectors or import paths.
Do not infer `@kirbydesign/designsystem/<key>` from these keys.

## Components and foundations

| Subject                                           | Showcase key                                               | Example key                            |
| ------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| Accordion                                         | `accordion-showcase`                                       | `accordion-example`                    |
| Action sheet (deprecated; choose Menu for new UI) | `action-sheet-showcase`                                    | `action-sheet-example`                 |
| Alert                                             | `alert-showcase`                                           | `modal-example`                        |
| Avatar                                            | `avatar-showcase`                                          | `avatar-example`                       |
| Badge                                             | `badge-showcase`                                           | `badge-example`                        |
| Border radius                                     | `border-radius-showcase`                                   | Read token table                       |
| Breakpoints                                       | `breakpoints-showcase`                                     | Read token table                       |
| Button                                            | `button-showcase`                                          | `button-example`                       |
| Calendar                                          | `calendar-showcase`                                        | `calendar-example`                     |
| Card                                              | `card-showcase`                                            | `card-example`                         |
| Chart                                             | `chart-showcase`                                           | `charts-example`                       |
| Chart configuration (bar/stock)                   | `chart-config-showcase/bar`, `chart-config-showcase/stock` | `charts-example/examples/config`       |
| Checkbox                                          | `checkbox-showcase`                                        | `checkbox-example`                     |
| Colors (legacy palette documentation)             | `colors-showcase`                                          | Use styling reference's version policy |
| Data table                                        | `data-table-showcase`                                      | `data-table-example`                   |
| Divider                                           | `divider-showcase`                                         | `divider-example`                      |
| Dropdown                                          | `dropdown-showcase`                                        | `dropdown-example`                     |
| Elevation                                         | `elevation-showcase`                                       | Read token table                       |
| Empty state                                       | `empty-state-showcase`                                     | `empty-state-example`                  |
| FAB sheet                                         | `fab-sheet-showcase`                                       | `fab-sheet-example`                    |
| Flag                                              | `flag-showcase`                                            | `flag-example`                         |
| Form field, input, textarea, masks, counters      | `form-field-showcase`                                      | `form-field-example`                   |
| Grid                                              | `grid-showcase`                                            | `grid-example`                         |
| Header                                            | `header-showcase`                                          | `header-example`                       |
| Icon                                              | `icon-showcase`                                            | `icon-example`                         |
| Item                                              | `item-showcase`                                            | `item-example`                         |
| Item group (hidden showcase route)                | `item-group-showcase`                                      | `item-group-example`                   |
| Item sliding (hidden showcase route)              | `item-sliding-showcase`                                    | `item-sliding-example`                 |
| Label                                             | `label-showcase`                                           | `label-example`                        |
| Link                                              | `link-showcase`                                            | `link-example`                         |
| List                                              | `list-showcase`                                            | `list-example`                         |
| List experimental (hidden showcase route)         | `list-experimental-showcase`                               | `list-experimental-example`            |
| List load on demand                               | `list-load-on-demand-showcase`                             | `list-load-on-demand-example`          |
| List without shape                                | `list-no-shape-showcase`                                   | `list-no-shape-example`                |
| List swipe                                        | `list-swipe-showcase`                                      | `list-swipe-example`                   |
| Loading overlay                                   | `loading-overlay-showcase`                                 | `loading-overlay-example`              |
| Menu                                              | `menu-showcase`                                            | `menu-example`                         |
| Modal                                             | `modal-showcase`                                           | `modal-example`                        |
| Page                                              | `page-showcase`                                            | `page-example`                         |
| Page tab navigation                               | `page-tab-navigation-showcase`                             | `tab-navigation-example`               |
| Progress circle                                   | `progress-circle-showcase`                                 | `progress-circle-example`              |
| Radio                                             | `radio-showcase`                                           | `radio-example`                        |
| Range                                             | `range-showcase`                                           | `range-example`                        |
| Reorder list                                      | `reorder-list-showcase`                                    | `reorder-list-example`                 |
| Section header                                    | `section-header-showcase`                                  | `section-header-example`               |
| Segmented control                                 | `segmented-control-showcase`                               | `segmented-control-example`            |
| Slide button                                      | `slide-button-showcase`                                    | `slide-button-example`                 |
| Slides                                            | `slides-showcase`                                          | `slides-example`                       |
| Spacing                                           | `spacing-showcase`                                         | Read token table                       |
| Spinner                                           | `spinner-showcase`                                         | `spinner-example`                      |
| Stock chart                                       | `stock-chart-showcase`                                     | `stock-chart-example`                  |
| Styled HTML lists                                 | `styling-html-lists`                                       | `styling-html-lists-example`           |
| Tabs                                              | `tabs-showcase`                                            | `tabs-example`                         |
| Toast                                             | `toast-showcase`                                           | `toast-example`                        |
| Toggle                                            | `toggle-showcase`                                          | `toggle-example`                       |
| Toggle button                                     | `toggle-button-showcase`                                   | `toggle-button-example`                |
| Toolbar                                           | `toolbar-showcase`                                         | See showcase's embedded snippets       |
| Typography                                        | `typography-showcase`                                      | `fonts-example`                        |

## Guides

All paths below are relative to the source root:

| Guide                    | Documentation path                                    | Implementation path under `examples/`                          |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| Chart configuration      | `guides/chart-config-guide/`                          | `charts-example/examples/config/`                              |
| Virtual scrolling        | `guides/virtual-scroll/virtual-scroll-list/`          | `virtual-scroll-example/virtual-scroll-list-example/`          |
| Single grid container    | `guides/grid-layout/grid-layout-single-container/`    | `grid-layout-example/grid-layout-single-container-example/`    |
| Multiple grid containers | `guides/grid-layout/grid-layout-multiple-containers/` | `grid-layout-example/grid-layout-multiple-containers-example/` |
| Extended grid layout     | `guides/grid-layout/grid-layout-extended/`            | `grid-layout-example/grid-layout-extended-example/`            |

Use the main skill's version-resolution rules when constructing source URLs. Read only the
selected guide and implementation; directory paths identify source material, not component APIs.

## Other documentation

Paths are relative to the same source root:

| Subject                                | Documentation path                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| Product introduction                   | `intro/intro.component.html`                                                         |
| Accessibility                          | `accessibility/accessibility-guidelines.html`                                        |
| Locale setup and internal translations | `localization/localization.component.html`, `localization/localization.component.ts` |
| Guide overview                         | `guides/guides.component.html`                                                       |
| Extensions scope                       | `extensions/extensions-landing-page.component.html`                                  |

Kirby Extensions are community-maintained additions, not automatically part of
`@kirbydesign/designsystem`. Their documentation is at
[extensions.kirby.design](https://extensions.kirby.design). Check whether the app installs the
relevant extension package and its compatible version before proposing one.
