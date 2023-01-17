# Migrations

This document provides information about breaking changes and their migrations for major versions of Kirby Design System.

## Version 8

- [Version 8](#version-8)
  - [Components](#components-v8)
    - [List](#list-v8)

<h3 id="components-v8">Components</h3>

<h4 id="list-v8">List</h4>

It is now required to pass `[selectable]="true"` to `kirby-item` if items in the list should have a hover effect

## Version 6

- [Version 6](#version-6)
  - [Platform Support](#platform-support)
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
