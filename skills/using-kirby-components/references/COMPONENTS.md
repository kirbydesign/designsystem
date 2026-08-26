# Kirby Components — selectors & import paths

All components are standalone and imported from a per-component subpath
(`@kirbydesign/designsystem/<name>`). Always use these secondary entry points — never the
top-level barrel, and never `KirbyModule`.

## Common components

| Selector                                                                                                                 | TS symbol(s)                                                                  | Subpath              |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | -------------------- |
| `button[kirby-button]`, `a[kirby-button]`                                                                                | `ButtonComponent`                                                             | `/button`            |
| `kirby-card`, `kirby-card-header`, `kirby-card-footer`                                                                   | `CardComponent`, `CardHeaderComponent`, `CardFooterComponent`                 | `/card`              |
| `kirby-icon`                                                                                                             | `IconComponent`                                                               | `/icon`              |
| `kirby-item`, `kirby-label`                                                                                              | `ItemComponent`, `LabelComponent`                                             | `/item`              |
| `kirby-item-group`                                                                                                       | `ItemGroupComponent`                                                          | `/item-group`        |
| `kirby-list`, `kirby-list-item`, `kirby-list-header`, `kirby-list-section-header`                                        | `ListComponent`, `ListItemComponent`, …                                       | `/list`              |
| `kirby-avatar`                                                                                                           | `AvatarComponent`                                                             | `/avatar`            |
| `kirby-badge`                                                                                                            | `BadgeComponent`                                                              | `/badge`             |
| `kirby-checkbox`                                                                                                         | `CheckboxComponent`                                                           | `/checkbox`          |
| `kirby-radio`, `kirby-radio-group`                                                                                       | `RadioComponent`, `RadioGroupComponent`                                       | `/radio`             |
| `kirby-toggle`                                                                                                           | `ToggleComponent`                                                             | `/toggle`            |
| `kirby-toggle-button`                                                                                                    | `ToggleButtonComponent`                                                       | `/toggle-button`     |
| `kirby-range`                                                                                                            | `RangeComponent`                                                              | `/range`             |
| `kirby-divider`                                                                                                          | `DividerComponent`                                                            | `/divider`           |
| `kirby-spinner`                                                                                                          | `SpinnerComponent`                                                            | `/spinner`           |
| `kirby-flag`                                                                                                             | `FlagComponent`                                                               | `/flag`              |
| `kirby-menu`                                                                                                             | `MenuComponent`                                                               | `/menu`              |
| `kirby-dropdown`                                                                                                         | `DropdownComponent`                                                           | `/dropdown`          |
| `kirby-page`, `kirby-page-title`, `kirby-page-content`, `kirby-page-actions`, `kirby-page-progress`, `kirby-page-footer` | `PageComponent`, …                                                            | `/page`              |
| `kirby-header`                                                                                                           | `HeaderComponent`                                                             | `/header`            |
| `kirby-app`                                                                                                              | `KirbyAppComponent`                                                           | `/kirby-app`         |
| `kirby-router-outlet`                                                                                                    | `RouterOutletComponent`                                                       | `/router-outlet`     |
| `kirby-modal`, `kirby-modal-wrapper`, `kirby-modal-footer`, `kirby-alert`, `kirby-action-sheet`                          | `ModalController`, `ModalHelper`, …                                           | `/modal`             |
| `kirby-popover`                                                                                                          | `PopoverComponent`                                                            | `/popover`           |
| `kirby-empty-state`                                                                                                      | `EmptyStateComponent`                                                         | `/empty-state`       |
| `kirby-section-header`                                                                                                   | `SectionHeaderComponent`                                                      | `/section-header`    |
| `kirby-segmented-control`                                                                                                | `SegmentedControlComponent`                                                   | `/segmented-control` |
| `kirby-slides`                                                                                                           | `SlidesComponent`                                                             | `/slide`             |
| `kirby-slide-button`                                                                                                     | `SlideButtonComponent`                                                        | `/slide-button`      |
| `kirby-accordion-item`                                                                                                   | `AccordionItemComponent`                                                      | `/accordion`         |
| `kirby-tab-bar`, `kirby-tab-button`                                                                                      | `TabsComponent`, `TabButtonComponent`                                         | `/tabs`              |
| `kirby-tab-navigation`, `kirby-tab-navigation-item`                                                                      | `TabNavigationComponent`, …                                                   | `/tab-navigation`    |
| `kirby-calendar`                                                                                                         | `CalendarComponent`                                                           | `/calendar`          |
| `kirby-progress-circle`, `kirby-progress-circle-ring`                                                                    | `ProgressCircleComponent`, `ProgressCircleRingComponent`                      | `/progress-circle`   |
| `kirby-loading-overlay`                                                                                                  | `LoadingOverlayComponent`                                                     | `/loading-overlay`   |
| `kirby-fab-sheet`                                                                                                        | `FabSheetComponent`                                                           | `/fab-sheet`         |
| `kirby-action-group`                                                                                                     | `ActionGroupComponent`                                                        | `/action-group`      |
| `kirby-reorder-list`                                                                                                     | `ReorderListComponent`                                                        | `/reorder-list`      |
| `kirby-item-sliding`                                                                                                     | `ItemSlidingComponent`                                                        | `/item-sliding`      |
| `kirby-form-field`, `kirby-form-field-message`, `kirby-input-counter`                                                    | `FormFieldComponent`, `InputComponent`, `TextareaComponent`, `AffixDirective` | `/form-field`        |
| `kirby-base-chart`, `kirby-stock-chart`                                                                                  | `ChartComponent`, …                                                           | `/chart`             |
| (no element selector)                                                                                                    | `TableSortableComponent`                                                      | `/data-table`        |

## Overlays

<a id="overlays"></a>

**Modals** — prefer the declarative `kirby-modal` component (`/modal`). Reach for
`ModalController` only when imperative control is necessary (opening from a service, no
template-bound trigger). `ModalController` methods: `showModal(...)`,
`showActionSheet(...)`, `showAlert(...)`.

**Toasts / loading** — these have no declarative component and are opened via injected
controllers:

- `ToastController` — show toast notifications.
- `LoadingOverlayService` (or the `kirby-loading-overlay` component) — loading overlay.

Inject controllers with `inject(ModalController)` etc. Check the installed package's
`.d.ts` for exact method signatures.

## Notes

- The full published subpath list also includes: `/config`, `/helpers`, `/helpers/scss`,
  `/shared`, `/shared/floating`, `/shared/portal`, `/types`, `/gesture`.
- Selectors and inputs above are verified against Kirby designsystem `11.x`. For newer
  versions, confirm against `node_modules/@kirbydesign/designsystem` or the cookbook.
