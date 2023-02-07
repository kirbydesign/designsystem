# Migrations

This document provides information about breaking changes and their migrations for major versions of Kirby Design System.

## Version 8

- [Version 8](#version-8)
  - [Platform Support](#platform-support-v8)
  - [Components](#components-v8)
    - [Button](#button-v8)
    - [Card](#card-v8)
    - [Chart](#chart-v8)
    - [Chip](#chip-v8)
    - [Disclosure](#disclosure-v8)
    - [List](#list-v8)
    - [Range](#range-v8)

<h3 id="platform-support-v8">Platform Support</h3>

- As of version 8, Kirby expects Angular 15.0.0 or later versions.
- ChartJS, RxJS and date-fns related packages are now peerDependencies, and should be installed by projects.
- Kirby now relies on features in RxJS 7, and consumers should update the dependency accordingly.
- ResizeObserver and IntersectionObserver polyfills have been removed.
  - If they have previously been copied from the Kirby package to your projects output folder compile time via `build > options > assets` in angular.json that configuration should be removed, as Kirby no longer supplies the polyfills.

<h3 id="components-v8">Components</h3>

<h4 id="button-v8">Button</h4>

The isDesctructive behavior of button should only be used internally by Kirby in the alert, as destructive actions are always announced via an alert. Use the default button attention levels and combine with alerts when needed.

<h4 id="card-v8">Card</h4>

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

<h4 id="list-v8"><strong>List</strong></h4>

It is now required to pass `[selectable]="true"` to `kirby-item` if items in the list should have a hover effect.

<br>
<h4 id="range-v8"><strong>Range</strong></h4>
When setting value on Range the value change event is no longer fired. It will only be triggered if the user has interacted with the range slider.

## Version 6

- [Migrations](#migrations)
  - [Version 8](#version-8)
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
