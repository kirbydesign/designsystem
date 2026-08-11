# Migrations

This document provides information about breaking changes and their migrations for major versions of the `@kirbydesign/extensions-angular` package.

Kirby Extensions is versioned and released independently from `@kirbydesign/designsystem`. For migrations of the core design system see the [Kirby Design System migration guide](https://github.com/kirbydesign/designsystem/blob/develop/MIGRATION.md).

## Version 5.0.0

- [Components](#components-v5)
  - [Sidebar](#sidebar-v5)

<h3 id="components-v5">Components</h3>

<h4 id="sidebar-v5">Sidebar</h4>

The menu is no longer configured directly on `<kirby-x-sidebar>`. Instead it is provided as a dedicated `<kirby-x-sidebar-menu>` element placed inside the sidebar, alongside the header and footer, and is projected into a new content area between the two.

Note that this is a silent breaking change. Applications that are not migrated will still compile, but the sidebar will render without any menu items and none of the menu outputs will fire. Verify that menu items render after upgrading.

All menu-related inputs and outputs have moved from `<kirby-x-sidebar>` to the new `<kirby-x-sidebar-menu>` component, keeping the same names and types. The inputs `menuItems`, `selectedItem`, `expandedItems`, `checkedItems` and `autoCollapse`, along with the outputs `menuItemsChange`, `selectedItemChange`, `expandedItemsChange`, `checkedItemsChange`, `expandChange`, `checkChange`, `itemReorder` and `itemSelect`, should be moved onto a `<kirby-x-sidebar-menu>` element placed between the header and footer.

Before:

```html
<kirby-x-sidebar
  [menuItems]="menuItems"
  [selectedItem]="selectedItem"
  [autoCollapse]="autoCollapse"
  (itemSelect)="onSelect($event)"
>
  <kirby-x-sidebar-header>…</kirby-x-sidebar-header>
  <kirby-x-sidebar-footer>…</kirby-x-sidebar-footer>
</kirby-x-sidebar>
```

After:

```html
<kirby-x-sidebar>
  <kirby-x-sidebar-header>…</kirby-x-sidebar-header>

  <kirby-x-sidebar-menu
    [menuItems]="menuItems"
    [selectedItem]="selectedItem"
    [autoCollapse]="autoCollapse"
    (itemSelect)="onSelect($event)"
  ></kirby-x-sidebar-menu>

  <kirby-x-sidebar-footer>…</kirby-x-sidebar-footer>
</kirby-x-sidebar>
```

As `<kirby-x-sidebar-menu>` is a standalone component, `SidebarMenuComponent` must be added to the `imports` of the consuming component or module.

```ts
import { SidebarMenuComponent } from '@kirbydesign/extensions-angular/sidebar-menu';
```

A new `SidebarMenuLoaderComponent` (`<kirby-x-sidebar-menu-loader>`) is available to render a skeleton placeholder in the menu area while data is loading, and can be used in place of `<kirby-x-sidebar-menu>`.

Finally, the internal sidebar host selector has been renamed from `aside[kirby-x-sidebar-menu]` to `aside[kirby-x-sidebar-container]`. Any styles or tests targeting the old selector should be updated accordingly, as the `kirby-x-sidebar-menu` name is now used by the new public menu component.
