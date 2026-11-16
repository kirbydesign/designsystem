# Pages and navigation

## Choose the structure

| Requirement                                | Choose                                                    | Constraint                                                                         |
| ------------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Page layout                                | One `kirby-page` and `kirby-page-content` per page        | Use `kirby-header` for new header layouts when the installed version supports it.  |
| Top-level tab navigation with child routes | `kirby-tabs` / `kirby-tab-button`                         | Each `tab` points to a child route; routed content is supplied by the tabs outlet. |
| Related content sections on one page       | `kirby-tab-navigation`                                    | At least two tabs; connect tabs and panels with ARIA.                              |
| Toggle related choices within content      | `kirby-segmented-control`                                 | A choice/filter, not a replacement for routed navigation.                          |
| Nested vertical navigation                 | Extension `kirby-x-sidebar-menu` inside `kirby-x-sidebar` | Use typed menu items and the public sidebar composition.                           |

## Page and header

```ts
import { Component } from '@angular/core';
import { HeaderComponent } from '@kirbydesign/designsystem/header';
import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';

@Component({
  selector: 'app-records-page',
  standalone: true,
  imports: [HeaderComponent, PageComponent, PageContentComponent],
  template: `
    <kirby-page>
      <kirby-header title="Records" subtitle1="Your overview"></kirby-header>
      <kirby-page-content>
        <p>Choose a record to see its details.</p>
      </kirby-page-content>
    </kirby-page>
  `,
})
export class RecordsPageComponent {}
```

For new page headers, use `kirby-header` for title, subtitles and actions instead of the legacy
page title/subtitle/actions inputs and directives.

With `kirby-router-outlet`, pages are stacked and a hidden page may not be destroyed. Pause/resume
page-scoped background work using `leave`/`enter`. `ngOnDestroy` alone is not sufficient
for leaving a stacked page.

## Accessible page sections

Use `TabNavigationComponent` and `TabNavigationItemComponent` from
`@kirbydesign/designsystem/tab-navigation`. The containing component declares `selectedIndex = 0`.
This fragment is the tab/panel portion; place it in the page layout as appropriate.

```html
<kirby-tab-navigation aria-label="Record sections" [(selectedIndex)]="selectedIndex">
  <kirby-tab-navigation-item
    label="Overview"
    id="record-overview-tab"
    aria-controls="record-overview-panel"
  ></kirby-tab-navigation-item>
  <kirby-tab-navigation-item
    label="History"
    id="record-history-tab"
    aria-controls="record-history-panel"
  ></kirby-tab-navigation-item>
</kirby-tab-navigation>
@if (selectedIndex === 0) {
<section id="record-overview-panel" role="tabpanel" aria-labelledby="record-overview-tab">
  <h2>Overview</h2>
  <p>Current record details.</p>
</section>
} @else {
<section id="record-history-panel" role="tabpanel" aria-labelledby="record-history-tab">
  <h2>History</h2>
  <p>Previous changes to this record.</p>
</section>
}
```

Use unique IDs if repeated. Only the active panel should be visible to assistive technology; remove
inactive panels or hide with `display: none`. For sticky tabs, use `*kirbyPageStickyContent` and import
`PageStickyContentDirective` from `@kirbydesign/designsystem/page`.

## Sidebar menu

Import the public components and `SidebarMenuItem` type from
`@kirbydesign/extensions-angular/sidebar-menu`.

```ts
import { Component } from '@angular/core';
import {
  SidebarComponent,
  SidebarMenuComponent,
  SidebarMenuItem,
} from '@kirbydesign/extensions-angular/sidebar-menu';

@Component({
  selector: 'app-section-menu',
  standalone: true,
  imports: [SidebarComponent, SidebarMenuComponent],
  template: `
    <nav aria-label="Sections">
      <kirby-x-sidebar>
        <kirby-x-sidebar-menu
          [menuItems]="menuItems"
          [(selectedItem)]="selectedItem"
        ></kirby-x-sidebar-menu>
      </kirby-x-sidebar>
    </nav>
  `,
})
export class SectionMenuComponent {
  selectedItem = 'overview';
  readonly menuItems: SidebarMenuItem[] = [
    { type: 'router-link', id: 'overview', title: 'Overview', route: '/overview' },
    { type: 'router-link', id: 'history', title: 'History', route: '/history' },
  ];
}
```

- `SidebarMenuItem` covers `SubmenuItem`, `ActionItem`, `RouterLinkItem`, `ExternalLinkItem` and
  `Divider`. Use these typed contracts rather than treating every item as a route.
- `selectedItem` is a string ID; `expandedItems` and `checkedItems` are `Set<string>`.
  Each has a matching `...Change` output for two-way binding. `expandChange` emits
  `{ id, isExpanded }`; `checkChange` emits `{ id, isChecked }`.
- Optional `SidebarHeaderComponent` and `SidebarFooterComponent` belong inside `kirby-x-sidebar`.
  Header content requires `slot="logo"` or `slot="action"`; un-slotted text is not rendered.
  `SidebarMenuLoaderComponent` supplies the menu-specific loading placeholder.
