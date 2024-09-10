# Migrations

This document provides information about breaking changes and their migrations for major versions of Kirby Design System.

## Version 10.0.0

- [Platform Support](#platform-support-v10)
- [Components](#components-v10)
  - [Card](#card-v10)
  - [Data Table](#data-table-v10)
  - [Empty State](#empty-state-v10)
  - [Icon](#icon-v10)
  - [Page](#page-v10)
  - [Tabs](#tabs-v10)

<h3 id="platform-support-v10">Platform Support</h3>

- As of version 10 Kirby expects Angular 18.0.0 or later.

<h3 id="components-v10">Components</h3>

<h4 id="card-v10">Card</h4>

The `flat` property has been removed and all usages of this property must be replaced with the new `variant` property for identical behavior by inserting `variant="flat"` instead.

<h4 id="data-table-v10">Data Table</h4>

The `TableComponent` and `TableRowComponent` have been been removed and should be replaced by the `kirby-table` CSS class.

The `DataTableModule` has been deprecated in favor of the standalone `TableSortableComponent`.
All imports of `DataTableModule` should be replaced with `TableSortableComponent`.  
`DataTableModule` will be removed in Kirby v11.

<h4 id="empty-state-v10">Empty State</h4>

The deprecated `customIconName` property has been removed and `iconName` should be used as a direct replacement.

<h4 id="icon-v10">Icon</h4>

The deprecated `customName` property has been removed and `name` should be used as a direct replacement.

<h4 id="page-v10">Page</h4>

<h5>Properties</h5>

The following options for the `maxWidth` property have been removed and usages should be updated accordingly:

- `standard`: remove all usages (same as default width of page)
- `optimized`: should be replaced with `lg`

<h5>Page Local Navigation</h5>

The deprecated `page-local-navigation` component has been fully removed and should be replaced by `kirby-tab-navigation`.

<h5>Sass</h5>

The deprecated `$page-content-max-width` Sass variable has been removed and `$page-content-max-width-default` should be used as a direct replacement.

<h4 id="tabs-v10">Tabs</h4>

The deprecated `routerLink` property in `kirby-tab-button` component has been removed and `tab` should be used as a direct replacement.

## Version 9.0.0

- [Components](#components-v9)
  - [Avatar](#avatar-v9)
  - [Button](#button-v9)
  - [Badge](#badge-v9)
  - [Experimental Alert](#experimental-alert-v9)
  - [Grid](#grid-v9)
  - [Modal](#modal-v9)
  - [Range](#range-v9)
  - [Slides](#slides-v9)
- [Styles](#styles-v9)
- [Dependencies](#dependencies-v9)

<h3 id="components-v9">Components</h3>

<h4 id="avatar-v9">Avatar</h4>

The `shadow` input binding has been removed and `stroke` should be used instead for a similar effect.

<h4 id="button-v9">Button</h4>

The deprecated attention level 4 has been removed. This has no visual significance as level 4 was mapped to level 3 internally in the button, but any references to attention level 4 should be removed from code.

<h4 id="badge-v9">Badge</h4>

`KirbyBadgeModule` has been removed. `BadgeComponent` is now standalone and can be imported directly.

<h4 id="experimental-alert-v9">Experimental Alert</h4>

The Experimental Alert has been fully removed and we recommend to use the normal alert instead.

<h4 id="grid-v9">Grid</h4>

The grid **component** has been removed in favor of using the much more flexible [Grid HTML classes](https://cookbook.kirby.design/#/home/showcase/grid).

<h4 id="modal-v9">Modal</h4>

The following methods have been removed from the `modalController` and all usages of these methods should be removed: `registerPresentingElement`, `scrollToTop`, `scrollToBottom`.

<h4 id="range-v9">Range</h4>

The `change` event no longer emits for each value change, but instead only when the user releases the knob after dragging or when the user moves the knob with keyboard arrows.
This prevents excessively emitting _a lot_ of events especially for large ranges, and removes the need for debouncing measures in applications.

If the previous functionality of reacting to each value change is needed consider binding to the `move` event instead.

<h4 id="slides-v9">Slides</h4>

Navigation arrows (desktop only) and selected slide indicators are now shown by default. It is possible to opt-out of this by setting `showNavigation` to `false`.

The `selectedSlide` event emitter has been removed and `slideChange` should be used as a direct replacement.

<h3 id="styles-v9">Styles</h3>

A new `xsmall` breakpoint (`320px`) has been introduced in the `$breakpoints` map exposed by Kirby. The `xsmall` breakpoint replaces the old `small` breakpoint, which is now `632px`.

A `$page-content-max-widths` map has been introduced to support `default`, `optimized` and `full`-width content on Kirby Page. This means that the standalone variable `$page-content-max-width` is deprecated in v9 and `$page-content-max-width-default` should be used in its place.
For backwards compatability both variables return the `default` value until v10 where `$page-content-max-width` is removed entirely in favor of `$page-content-max-width-default`.
<br>

Values from the new content-width map can be retrieved with the `get-page-content-max-width()` convenience function, e.g. `get-page-content-max-width('full')`.

<h3 id="dependencies-v9">Dependencies</h3>

The `@kirbydesign/core` package that contain helpers for the designsystem package is now an ES Module, and no longer exports a CommonJS javascript bundle. If e.g. your Jest tests are otherwise configured to use CommonJS you might need to ignore transformation of the `@kirbydesign/core` files.

## Version 8.3.0

- [Components](#components-v8-3)
  - [Menu](#menu-v8-3)
  - [Page](#page-v8-3)
  - [Tab Navigation](#tab-nav-v8-3)

As of Kirby version 8.3.0 a number of enhancements have been introduced, improving the look and feel of components like Page and Modal
while also providing a better user experience on larger screen sizes (e.g. desktop).

As these features are direct replacements of existing functionality, the existing functionality will be marked as deprecated from v9, and finally removed in v10.
To gain the benefit of the improvements we strongly encourage consumers to migrate to the new features as soon as possible.

<br>
<h3 id="components-v8-3">Components</h3>

<h4 id="menu-v8-3">Menu</h4>
Menu replaces Action Sheet to provide a better experience across platforms and screen sizes. Menu is a new component that renders a button that acts as a trigger for showing / hiding a popover menu. The menu is used declaratively in markup to simplify usage and is no longer instantiated through the modalController like the Action Sheet.

<br>

<h4 id="page-v8-3">Page</h4>

Use of custom page elements for title, subtitle, action buttons and fixed content with the `*kirbyPage`-directives are being superseeded by the new `kirby-header` component. See the [Header documentation](https://cookbook.kirby.design/#/home/showcase/header) for more information on how to integrate this into your page.

The content area in Page now defaults to a max width of 720px to improve desktop support with optional presets to adjust the content width. See the “Content Width” section in [Kirby Page Docs](https://cookbook.kirby.design/#/home/showcase/page) for more details.

Kirby page can also be used together with a set of new css utilities that allow further customisation for larger screen layouts. Use Kirby Grid to implement responsive layouts. For more details and examples of usage see [Kirby Grid Docs](https://cookbook.kirby.design/#/home/showcase/grid).

<br>

<h4 id="tab-nav-v8-3">Tab Navigation</h4>

The experimental `kirby-page-local-navigation` component is deprecated and replaced with the functionally equivalent `kirby-tab-navigation` component.

The tab text is now declared by setting the ‘label’ attribute of the `kirby-tab-navigation-item`.

The optional right-justified badge is declared by specifying a `kirby-badge` element within the `kirby-tab-navigation-item`.

<br>

## Version 8

- [Version 8](#version-8)
  - [Platform Support](#platform-support-v8)
  - [Components](#components-v8)
    - [Button](#button-v8)
    - [Card](#card-v8)
    - [Chart](#chart-v8)
    - [Chip](#chip-v8)
    - [Disclosure](#disclosure-v8)
    - [Dropdown](#dropdown-v8)
    - [List](#list-v8)
    - [Range](#range-v8)

<h3 id="platform-support-v8">Platform Support</h3>

- As of version 8, Kirby expects Angular 15.0.0 or later versions.
- ChartJS, RxJS and date-fns related packages are now peerDependencies, and should be installed by projects.
- Kirby now relies on features in RxJS 7, and consumers should update the dependency accordingly.
- ResizeObserver and IntersectionObserver polyfills have been removed.
  - If they have previously been copied from the Kirby package to your projects output folder compile time via `build > options > assets` in angular.json that configuration should be removed, as Kirby no longer supplies the polyfills.

Additionally, multiple components and directives are now standalone components, which means they should be imported rather than declared inside consuming angular components. Expand below to see a list of all related components.

<details>
  <summary><strong>Expand to see full list of new standalone components</strong></summary>

- AvatarComponent
- ActionSheetComponent
- AlertComponent
- AffixDirective
- ButtonComponent
- CalendarComponent
- CheckboxComponent
- DividerComponent
- FabSheetComponent
- FlagComponent
- DateInputDirective
- DecimalMaskDirective
- InputComponent
- TextAreaComponent
- GridComponent
- ItemGroupComponent
- ItemSlidingComponent
- LoadingOverlayComponent
- ModalFooterComponent
- ModalWrapperComponent
- ModalCompactWrapperComponent
- FitHeadingDirective
- PopoverComponent
- ProgressCircleRingComponent
- ProgressCircleComponent
- RangeComponent
- ReorderListComponent
- SectionHeaderComponent
- ComponentLoaderDirective
- ThemeColorDirective
- SlideButtonComponent
- PageLocalNavigationComponent
- SegmentedControlComponent
- ToggleComponent

</details>

<br>
<h3 id="components-v8">Components</h3>

<h4 id="button-v8">Button</h4>
The isDestructive behavior of button should only be used internally by Kirby in the alert, as destructive actions are always announced via an alert. Use the default button attention levels and combine with alerts when needed.

---

> _A note on button colors_: Attention level 3 has changed from an outline button to a white background.

<h4 id="card-v8">Card</h4>

The `mode` input is replaced with a boolean input 'flat' that can be set to true to remove the shadow around the card. This is not intended for use together with a clickable card or a card with a disclosure indicator.
The 'highlighted' look that could previously be set on cards is no longer an option and all cards will now have the same shadow going forward.

The `hasDarkBackgroundColor` input of card is no longer available. To have similar functionality `themeColor="dark"` should be set on cards instead, so interaction states light up instead of getting darker. The option is also useful for background images with darker content, because it ensures a better fallback color if the image loads asynchronosly.

<h4 id="chart-v8">Chart</h4>

Some of the Chart.js types previously re-exported by Kirby should now be imported directly from Chart.js.

Before:

`import { ChartOptions, ChartEvent, ActiveElement, Chart, AnnotationOptions } from '@kirbydesign/designsystem';`

After:

`import { ChartOptions, ChartEvent, ActiveElement, Chart } from 'chart.js';`

`import { AnnotationOptions } from 'chartjs-plugin-annotation';`

<h4 id="chip-v8"><strong>Chip</strong></h4>
The Kirby Chip component has been removed and is no longer used in any other Kirby components. Kirby Button should be used instead if similar functionality is needed in projects.

<br>
<h4 id="disclosure-v8"><strong>Disclosure on list, item & card</strong></h4>

A new _disclosure indicator_ feature has been added (e.g. an arrow on list items indicating a navigation option). See the Item and Card documentation on [the cookbook](https://cookbook.kirby.design/#/home/intro) for implementation details. While not a breaking change, it is an important update to the affordance of the list and items. The UI guidelines are as follows:

> #### KIRBY ITEM DISCLOSURE GUIDELINE
>
> **Components where disclosure indicators should be added**
>
> Disclosure Indicators are shown on all list items and cards that are clickable and navigate to a new page, drawer or modal - both navigation items and actions items.
>
> Non-clickable items that only shows details does not have disclosure indicators and should preferably use the XS item with key + title (fx card details).
>
> OBS: Generally avoid having both clickable and non-clickable items in the same list. In such case a light or semi dark title can be used to signify that the item is non-clickable.
>
> **Related components without indicators**
>
> Sidebar menu items only has disclosure icons if the item is expandable with sub-levels.
>
> Banner cards with images or illustrations should not have disclosure indicators. The image or illustration or the button is the signifier for affordance.

<br>

<h4 id="dropdown-v8"><strong>Dropdown</strong></h4>
While not a breaking change, attention levels for dropdowns have changed quite dramatically to match buttons attention level designs.
This means that attention level 2 buttons are now black, and if a white dropdown is desired, attention level 3 should be used instead.

<br>
<h4 id="list-v8"><strong>List</strong></h4>

It is now required to pass `[selectable]="true"` to `kirby-item` if items in the list should have a hover effect.

<br>
<h4 id="range-v8"><strong>Range</strong></h4>
When setting value on Range the value change event is no longer fired. It will only be triggered if the user has interacted with the range slider.

## Version 6

- [Migrations](#migrations)
  - [Version 6](#version-6)
    - [Platform Support](#platform-support)
    - [Styles](#styles)
    - [Components](#components)
      - [Alert](#alert)
      - [Chart](#chart)
      - [Icons](#icons)
      - [List](#list)
      - [Modal](#modal)
      - [Page](#page)
      - [Segmented Control](#segmented-control)
      - [Toast](#toast)
    - [Additional Performance notice](#additional-performance-notice)

### Platform Support

From v6 and onwards, Kirby no longer supports Angular projects using the Legacy View Engine. Applications already using Ivy should see no differences other than Kirby not needing an additional compile-step on their side via `ngcc`.

### Styles

`global-styles` and `utils` are now the only modules that can be loaded from `~@kirbydesign/designsystem/scss`.
This means that modules like `~@kirbydesign/designsystem/scss/theme/colors` is no longer available as a standalone module, and should instead be changed to `~@kirbydesign/designsystem/scss/utils`,
which forwards all mixins and functions exposed by Kirby.

### Components

#### Alert

`okBtnText` and `cancelBtnText` of `AlertConfig` are removed, and the existing `okBtn` and `cancelBtn` should be used instead, as a direct replacement for these.

#### Chart

The `kirby-chart` input property `dataLabels` has been removed. Use `labels` (with a similar API) instead.

#### Icons

Use of `IconSettings` is deprecated, use `IconRegistryService` instead, as per the [icon documentation](https://cookbook.kirby.design/#/home/showcase/icon), as follows:

```
import { IconRegistryService } from '@kirbydesign/designsystem';

const customIcons = [
    {
      name: 'customIconName',
      svg: '[PATH_TO_SVG_FILE]',
    },
    ...
];

@NgModule({ ... } )
export class MyModule {
  constructor(iconRegistryService: IconRegistryService) {
    iconRegistryService.addIcons(customIcons);
  }
}
```

#### List

`*kirbyListItem` and `*kirbyListFlexItem` is replaced in favor of the `*kirbyListItemTemplate` directive.

#### Modal

The `dim` field of the `ModalConfig` interface has been removed.

The `title` field of the `ModalConfig` interface has been removed. Instead, you should include a `<kirby-page-title>` element inside the embedded component markup with the title of your modal.

```
<kirby-page-title>My Modal Title</kirby-page-title>

<p>Some content of the embedded component</p>
```

See the [modal documentation](https://cookbook.kirby.design/#/home/showcase/modal) for more examples of this.

#### Page

The current spacing below custom titles (title elements with the `*kirbyPageTitle` directive) has been removed.
In cases where a text block immediately following the title heading within a custom title element has lost its intended spacing, the text should be moved to the new custom subtitle element (`*kirbyPageSubtitle`).

#### Segmented Control

It is no longer an option to mark a `SegmentItem` as `checked` when provided in the items input of `SegmentedControl`.
Use `selectedIndex` or `value` on `<kirby-segmented-control>` instead.

#### Toast

The `danger` variant of `MessageType` has been removed. Use Kirby Alert for critical events instead.

### Additional Performance notice

To improve the general performance of Kirby components, `OnPush` change detection has been enabled on a lot of the simpler components.

This is not a breaking change, as it has only been carried out for components that should be robust to this change because they have immutable inputs. Even though it has been tested thoroughly there might be edge cases or unforeseen consequences related to this change so please be aware that the following components now utilise OnPush change detection:

- `kirby-app`
- `kirby-button`
- `kirby-card-header`
- `kirby-card-footer`
- `kirby-chip`
- `kirby-divider`
- `kirby-empty-state`
- `kirby-fab-sheet`
- `kirby-icon`
- `kirby-item-component`
- `kirby-list-experimental`
- `kirby-list-header`
- `kirby-list-section-header`
- `kirby-loading-overlay`
- `kirby-alert`
- `kirby-modal-footer`
- `kirby-page-footer`
- `kirby-radio`
- `kirby-range`
- `kirby-router-outlet`
- `kirby-section-header`
- `kirby-spinner`
- `kirby-toggle`
