# Collections

## Choose the structure

| Requirement                     | Choose                      | Constraint                                                                    |
| ------------------------------- | --------------------------- | ----------------------------------------------------------------------------- |
| Repeated rows                   | `kirby-list` + `kirby-item` | Use list template directives and slots rather than hand-built icon/text rows. |
| Group content about one subject | `kirby-card`                | Compose it with items, lists, images or actions.                              |
| Complex row/column data         | Native `table.kirby-table`  | Kirby styles the table; application code implements sorting.                  |

## Selectable list

```ts
import { Component, output } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [ItemComponent, ListComponent, ListItemTemplateDirective],
  template: `
    <kirby-list [items]="records" (itemSelect)="recordSelected.emit($event)" aria-label="Records">
      <kirby-item *kirbyListItemTemplate="let record" [selectable]="true">
        <p class="kirby-item-title">{{ record.title }}</p>
        <data slot="end">{{ record.reference }}</data>
      </kirby-item>
    </kirby-list>
  `,
})
export class RecordListComponent {
  readonly records = [{ id: 'record-1', title: 'Example record', reference: 'R-001' }];
  readonly recordSelected = output<{ id: string; title: string; reference: string }>();
}
```

Adapted from
[selectable items](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/examples/list-example/examples/selectable-items.ts).
`itemSelect` supplies the action callback; `[selectable]="true"` supplies item interaction styling.
Give a list an accessible name when its purpose is not otherwise apparent.

Use the documented variants for sections, standalone rows, swiping and reordering.
Hidden/experimental list variants are not automatic defaults.

Sources:
[list](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/list-showcase/list-showcase.component.html),
[item slots](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/item-showcase/item-showcase.component.html).

## Load-on-demand versus virtual scrolling

Clarify whether the need is fetching more data or limiting rendered rows. For virtual scrolling,
verify item dimensions, the scroll host and behavior inside the actual page. For load-on-demand,
verify fetching state, failures and completion.

The [documentation index](./documentation-index.md#guides) lists the virtual-scroll guide and
implementation paths; load the matching pair and adapt it to the consuming page.

## Cards

Cards group a subject. The Cookbook deprecates the `flat` variant; use the documented
default or outlined variant for grouping, and the default for an entirely clickable card.
Provide an interaction affordance and verify keyboard behavior, not just a click handler.

Source:
[card](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/card-showcase/card-showcase.component.html).

## Tables

Data tables need native table semantics and headers. `kirby-selectable-row` and sorting indicators
are styling/hooks, not complete keyboard interaction or sorting implementations. Import the
documented `TableSortableComponent` for sortable headers and implement the actual sort.

Verify row selection payloads and keyboard behavior for the actual collection.

Source:
[data table](https://github.com/kirbydesign/designsystem/blob/develop/apps/cookbook/src/app/showcase/data-table-showcase/data-table-showcase.component.html).
