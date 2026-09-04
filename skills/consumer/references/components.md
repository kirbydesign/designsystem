# Kirby Components Reference

See [Cookbook](https://cookbook.kirby.design/#/home/showcase/{component-name}) for full API including key inputs. For complete Angular implementations, see the [Cookbook source examples](https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples). For a consumer-version match, replace `develop` with the installed Kirby version tag in the source URL.

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
| —                                         | `LoadingOverlayService`      | `ds/loading-overlay`   |
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

Use the declarative `kirby-modal` component for simple template-driven dialogs. Nest its content
inside `ng-template` and include a meaningful `kirby-page-title` in the embedded content.

Use `ModalController` when the dialog needs imperative control or is opened from a service. Use
route-based modals for wizard flows and deep-linkable modal content.

### Cards

Use `kirby-card` for grouping related content. Choose `elevated`, `flat`, or `outlined` based on
visual hierarchy; use the default elevated variant when the entire card is clickable, and add a
disclosure indicator for navigation or modal actions.

### Items

`kirby-item` supports text, icons, avatars, and controls through its slots. When an item contains
a button, checkbox, or other interactive control, do not also make the item `selectable`.

### Loading overlays

Use `kirby-loading-overlay` for content-scoped loading and `kirby-spinner` for inline loading.
Use `LoadingOverlayService` when a full-page loading overlay is controlled programmatically.
