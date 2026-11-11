# Pages and navigation

## Choose the structure

| Requirement                                | Choose                                             | Constraint                                                                         |
| ------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Page layout                                | One `kirby-page` and `kirby-page-content` per page | Use `kirby-header` for new header layouts when the installed version supports it.  |
| Top-level tab navigation with child routes | `kirby-tabs` / `kirby-tab-button`                  | Each `tab` points to a child route; routed content is supplied by the tabs outlet. |
| Related content sections on one page       | `kirby-tab-navigation`                             | At least two tabs; connect tabs and panels with ARIA.                              |
| Toggle related choices within content      | `kirby-segmented-control`                          | A choice/filter, not a replacement for routed navigation.                          |

Sources:
[page](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/page-showcase/page-showcase.component.html),
[tabs](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/tabs-showcase/tabs-showcase.component.html),
[segmented control](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/segmented-control-showcase/segmented-control-showcase.component.html).

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

Adapted from the
[header example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/header-example/examples/default.ts)
and [page guidance](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/page-showcase/page-showcase.component.html).
Older page examples use legacy title/subtitle/actions APIs; follow the header guidance rather than
copying those APIs into new code.

With `kirby-router-outlet`, pages are stacked and a hidden page may not be destroyed. Pause/resume
page-scoped subscriptions and background work using the page's `leave`/`enter` lifecycle, following
the app's existing pattern. `ngOnDestroy` alone is not sufficient for leaving a stacked page.
For hosted microfrontends, also follow the platform's visibility lifecycle when leaving the entire
microfrontend; page events alone may not cover that boundary.

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

Sources:
[tab navigation guidance](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/page-tab-navigation-showcase/tab-navigation-showcase.component.html),
[page example](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/tab-navigation-example/tab-navigation-example.component.ts).

Verify narrow and wide layouts, tab keyboard behavior, active-panel exposure, and subscription
cleanup when navigating away.
