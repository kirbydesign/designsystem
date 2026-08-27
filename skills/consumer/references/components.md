# Kirby Components Reference

See [Cookbook](https://cookbook.kirby.design/#/home/showcase/{component-name}) for full API including key inputs.

Import path prefixes:

- `ds/` → `@kirbydesign/designsystem/`
- `ext/` → `@kirbydesign/extensions-angular/`

| Selector                                  | Class(es)                    | Import                 |
| ----------------------------------------- | ---------------------------- | ---------------------- |
| `button[kirby-button]`, `a[kirby-button]` | `ButtonComponent`            | `ds/button`            |
| `[kirbyAccordion]`, `kirby-accordion`     | `AccordionDirective`         | `ds/accordion`         |
| `kirby-accordion-item`                    | `AccordionItemComponent`     | `ds/accordion`         |
| `kirby-action-group`                      | `ActionGroupComponent`       | `ds/action-group`      |
| `kirby-avatar`                            | `AvatarComponent`            | `ds/avatar`            |
| `kirby-badge`                             | `BadgeComponent`             | `ds/badge`             |
| `kirby-card`                              | `CardComponent`              | `ds/card`              |
| `kirby-card-header`                       | `CardHeaderComponent`        | `ds/card`              |
| `kirby-card-footer`                       | `CardFooterComponent`        | `ds/card`              |
| `kirby-checkbox`                          | `CheckboxComponent`          | `ds/checkbox`          |
| `th[sortable]`                            | `TableSortableComponent`     | `ds/data-table`        |
| `kirby-divider`                           | `DividerComponent`           | `ds/divider`           |
| `kirby-dropdown`                          | `DropdownComponent`          | `ds/dropdown`          |
| `kirby-empty-state`                       | `EmptyStateComponent`        | `ds/empty-state`       |
| `kirby-flag`                              | `FlagComponent`              | `ds/flag`              |
| `kirby-form-field`                        | `FormFieldComponent`         | `ds/form-field`        |
| `input[kirby-input]`                      | `InputComponent`             | `ds/form-field`        |
| `textarea[kirby-textarea]`                | `TextareaComponent`          | `ds/form-field`        |
| `kirby-header`                            | `HeaderComponent`            | `ds/header`            |
| `kirby-icon`                              | `IconComponent`              | `ds/icon`              |
| `kirby-item`                              | `ItemComponent`              | `ds/item`              |
| `kirby-label`                             | `LabelComponent`             | `ds/item`              |
| `kirby-item-group`                        | `ItemGroupComponent`         | `ds/item-group`        |
| `kirby-item-sliding`                      | `ItemSlidingComponent`       | `ds/item-sliding`      |
| `kirby-list`                              | `ListComponent`              | `ds/list`              |
| `kirby-loading-overlay`                   | `LoadingOverlayComponent`    | `ds/loading-overlay`   |
| `kirby-modal`                             | `ModalComponent`             | `ds/modal`             |
| `kirby-modal-footer`                      | `ModalFooterComponent`       | `ds/modal`             |
| `kirby-alert`                             | `AlertComponent`             | `ds/modal`             |
| `kirby-action-sheet`                      | `ActionSheetComponent`       | `ds/modal`             |
| `ModalController` (service)               | `ModalController`            | `ds/modal`             |
| `kirby-page`                              | `PageComponent`              | `ds/page`              |
| `kirby-page-footer`                       | `PageFooterComponent`        | `ds/page`              |
| `kirby-popover`                           | `PopoverComponent`           | `ds/popover`           |
| `kirby-progress-circle`                   | `ProgressCircleComponent`    | `ds/progress-circle`   |
| `kirby-radio`                             | `RadioComponent`             | `ds/radio`             |
| `kirby-radio-group`                       | `RadioGroupComponent`        | `ds/radio`             |
| `kirby-range`                             | `RangeComponent`             | `ds/range`             |
| `kirby-section-header`                    | `SectionHeaderComponent`     | `ds/section-header`    |
| `kirby-segmented-control`                 | `SegmentedControlComponent`  | `ds/segmented-control` |
| `kirby-slides`                            | `SlidesComponent`            | `ds/slide`             |
| `kirby-slide-button`                      | `SlideButtonComponent`       | `ds/slide-button`      |
| `kirby-spinner`                           | `SpinnerComponent`           | `ds/spinner`           |
| `kirby-tab-navigation`                    | `TabNavigationComponent`     | `ds/tab-navigation`    |
| `kirby-tab-navigation-item`               | `TabNavigationItemComponent` | `ds/tab-navigation`    |
| `kirby-tab-bar`                           | `TabsComponent`              | `ds/tabs`              |
| `kirby-tab-button`                        | `TabButtonComponent`         | `ds/tabs`              |
| `ToastController` (service)               | `ToastController`            | `ds/toast`             |
| `kirby-toggle`                            | `ToggleComponent`            | `ds/toggle`            |
| `kirby-toggle-button`                     | `ToggleButtonComponent`      | `ds/toggle-button`     |
| `kirby-x-image-banner`                    | `ImageBannerComponent`       | `ext/image-banner`     |
| `kirby-x-skeleton-loader`                 | `SkeletonLoaderComponent`    | `ext/skeleton-loader`  |
| `kirby-x-combobox`                        | `ComboboxComponent`          | `ext/combobox`         |

## Usage Guidance

### Modals

Prefer the declarative `kirby-modal` component (from `@kirbydesign/designsystem/modal`).
Only reach for `ModalController` when you genuinely need imperative control — e.g. opening
a modal from a service, or when the trigger isn't tied to a template.
