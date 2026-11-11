# Actions

## Choose the interaction

| Intent                              | Choose                                           | Important distinction                                               |
| ----------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| Navigate to another resource        | Native `<a>` with `href` or Angular `routerLink` | Kirby provides link styling, not a `kirby-link` component.          |
| Submit, mutate data, open a dialog  | `<button kirby-button>`                          | Keep button semantics even when a link-like appearance is required. |
| Popup list of actions               | `kirby-menu` containing `kirby-item`             | Menu replaces the deprecated action sheet on mobile and web.        |
| Retain a selected form/filter value | `kirby-dropdown`                                 | Use the forms recipe, not an action menu.                           |

Button attention level `1` is the primary call to action; `2` and `3` reduce emphasis. Use
`type="button"` for non-submit buttons inside forms. Keep an accessible name on icon-only buttons:

```html
<button kirby-button type="button" [showIconOnly]="true">
  <kirby-icon name="edit"></kirby-icon>
  Edit reference
</button>
```

Import `ButtonComponent` from `@kirbydesign/designsystem/button` and `IconComponent` from
`@kirbydesign/designsystem/icon`. `showIconOnly` visually hides the text while preserving the name.
The `xs` button is below the Cookbook's cited 44px enhanced target-size recommendation; avoid
selecting it purely to make a layout fit.

Sources:
[button](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/button-showcase/button-showcase.component.html),
[link](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/link-showcase/link-showcase.component.html).

## Action menu with a named trigger

Adapted from the
[custom trigger](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/menu-example/examples/customButton.ts)
and [selectable items](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/menu-example/examples/selectable.ts)
examples. The parent handles the emitted action.

```ts
import { Component, output } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { MenuComponent } from '@kirbydesign/designsystem/menu';

@Component({
  selector: 'app-record-actions',
  standalone: true,
  imports: [ButtonComponent, IconComponent, ItemComponent, MenuComponent],
  template: `
    <kirby-menu>
      <button kirby-button type="button" [showIconOnly]="true" attentionLevel="3">
        <kirby-icon name="menu-outline"></kirby-icon>
        Record actions
      </button>
      <kirby-item (click)="editRequested.emit()">
        <p class="kirby-item-title">Edit record</p>
      </kirby-item>
    </kirby-menu>
  `,
})
export class RecordActionsComponent {
  readonly editRequested = output<void>();
}
```

Custom triggers do not receive the default button's configuration. For embedded controls that
should keep the menu open, set `[closeOnSelect]="false"`. If stacking/clipping occurs, use the
documented portal configuration rather than arbitrary z-index overrides.

Verify trigger naming, keyboard opening/selection, dismissal, and execution of the selected action.

Source:
[menu guidance](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/menu-showcase/menu-showcase.component.html).
