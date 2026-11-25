---
name: kirby-data-grid
description: 'Builds data grids with kirby-data-grid from @kirbydesign/designsystem/data-grid, on top of TanStack Table v9: markup with the Kirby building blocks, server-side sorting and filtering, and row selection. Use when creating or changing a table or data grid that uses kirby-data-grid, kirbyDataGridRow, kirbyDataGridSelectionColumn or @tanstack/angular-table in an app built on Kirby.'
---

# Kirby data grid

`kirby-data-grid` is an **experimental** Kirby component. The API can still change between dev builds, so check the installed types (`node_modules/@kirbydesign/designsystem/data-grid`) before relying on anything not shown here.

**How it is split:**

- **TanStack Table v9 is the engine.** The app creates the table with `injectTable`, owns the state (sorting, selection) as signals, and fetches the data.
- **The app writes the table markup** on native `<table>` elements.
- **Kirby provides the container and building blocks** that add the look, the ARIA and the ready-made controls (sort buttons, selection checkboxes).

Kirby adds no engine features of its own. What a grid can do is decided by the TanStack features you register and the table options you set. For TanStack questions, use the skills shipped in `node_modules/@tanstack/angular-table/skills` and `node_modules/@tanstack/table-core/skills`.

## Prerequisites

- `@tanstack/angular-table` `^9.3.1` is installed; it is a peer dependency of the data grid.
- Kirby's global styles are included, as for `.kirby-table`. The selected-row and selection-column styles live there.

## Workflow

```
- [ ] 1. Define features and columns outside the component
- [ ] 2. Create the table with injectTable and controlled state
- [ ] 3. Write the markup with every building block
- [ ] 4. Add sorting and/or selection
- [ ] 5. Verify the ARIA in the browser
```

### 1. Features and columns

Register only the features the grid uses, and define features and columns outside the component, so they stay stable:

```ts
import {
  ColumnDef,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import { kirbyDataGridSelectionColumn } from '@kirbydesign/designsystem/data-grid';

const features = tableFeatures({ rowSortingFeature, rowSelectionFeature });

const columns: ColumnDef<typeof features, Payment>[] = [
  kirbyDataGridSelectionColumn({ rowLabel: (payment: Payment) => payment.recipient }),
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  { accessorKey: 'amount', header: 'Amount' },
];
```

### 2. The table and its state

The component owns each state slice as a signal and passes it back through `state`. Always set `getRowId`: selection is keyed by row ID, and without it selection attaches to the wrong rows after sorting or a reload.

```ts
readonly sorting = signal<SortingState>([]);
readonly rowSelection = signal<RowSelectionState>({});

readonly table = injectTable(() => ({
  features,
  columns,
  data: this.payments(),
  getRowId: (payment) => payment.id,
  state: { sorting: this.sorting(), rowSelection: this.rowSelection() },
  onSortingChange: (updater) => this.sorting.set(functionalUpdate(updater, this.sorting())),
  onRowSelectionChange: (updater) =>
    this.rowSelection.set(functionalUpdate(updater, this.rowSelection())),
}));
```

### 3. Markup

Place the grid on a `kirby-card` by default, as the design does. The card needs no padding or other settings. Leave the card out only where a card doesn't fit, for example inside a modal.

Every element gets its building block. They set `role="grid"`, `aria-rowcount`/`aria-colcount`, `aria-rowindex`/`aria-colindex`, `aria-sort` and `aria-selected`; leaving one out breaks accessibility without any error.

```html
<kirby-card>
  <kirby-data-grid [table]="table" label="Payments">
    <table class="kirby-table" kirbyDataGridTable>
      <thead>
        @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
        <tr [kirbyDataGridHeaderRow]="headerGroup">
          @for (header of headerGroup.headers; track header.id) {
          <th [kirbyDataGridHeaderCell]="header">
            <ng-container *flexRenderHeader="header; let value">{{ value }}</ng-container>
          </th>
          }
        </tr>
        }
      </thead>
      <tbody>
        @for (row of table.getRowModel().rows; track row.id) {
        <tr [kirbyDataGridRow]="row">
          @for (cell of row.getAllCells(); track cell.id) {
          <td [kirbyDataGridCell]="cell">
            <ng-container *flexRenderCell="cell; let value">{{ value }}</ng-container>
          </td>
          }
        </tr>
        }
      </tbody>
    </table>
  </kirby-data-grid>
</kirby-card>
```

Import `CardComponent` from `@kirbydesign/designsystem/card`, and `DataGridComponent`, `DataGridTableDirective`, `DataGridHeaderRowDirective`, `DataGridHeaderCellComponent`, `DataGridRowDirective` and `DataGridCellDirective` from `@kirbydesign/designsystem/data-grid`, and `FlexRender` from `@tanstack/angular-table`. `label` is required: it is the grid's accessible name.

### 4. Features

**Sorting.** Register `rowSortingFeature` and every header with an accessor becomes sortable; the header cell renders Kirby's sort button by itself. Turn it off per column with `enableSorting: false`. Kirby's sort behavior (start ascending, toggle between ascending and descending, one column at a time) needs these table options:

```ts
enableMultiSort: false,
enableSortingRemoval: false,
sortDescFirst: false,
```

**Row selection.** Register `rowSelectionFeature` and add `kirbyDataGridSelectionColumn({ rowLabel })` to the columns, usually first. `rowLabel` names each checkbox for screen readers ("Select Acme A/S"). Which rows can be selected is a table option, for example `enableRowSelection: (row) => row.original.status !== 'Rejected'`. Select all selects the loaded rows that can be selected. Read the selection from the `rowSelection` signal (selected IDs) or `table.getSelectedRowModel().rows` (loaded row objects).

**Server-side sorting.** Set `manualSorting: true`, so TanStack renders rows in the order the backend returns them, and put the sorting state in the request. See [references/server-side.md](references/server-side.md).

**Server-side filtering.** Register `columnFilteringFeature` (not `filteredRowModel`), keep `columnFilters` in a signal wired like the other state, set `manualFiltering: true`, and send the filter state with the request. Set filters through the column API, not by writing the signal, so the state has the shape later Kirby filter controls use:

```ts
this.table.getColumn('status')?.setFilterValue('Approved'); // filter
this.table.getColumn('status')?.setFilterValue(undefined); // remove the filter
```

The filter control itself (for example a `kirby-segmented-control` or a `kirby-dropdown` above the grid) is the app's for now. Rows a filter hides stay selected, because selection is keyed by row ID; count them as selected IDs that are not in the loaded rows if the UI should say so ("2 selected, 1 not shown").

### 5. Verify

In the browser's accessibility tree, the table should show as `grid` with its label, rows as `row`, headers as `columnheader` and cells as `gridcell`. Every `tr`, `th` and `td` should have `aria-rowindex` or `aria-colindex`.

## Not available yet

Filter controls inside the grid (a column menu), an empty state when a filter matches nothing, pagination, keyboard navigation inside the grid (the focus model), the `size` density styles, the layout with header, footer and side panel, and a loading state are planned but not built. Don't build workarounds that imitate them; ask the Kirby team, so the feature is built once in Kirby.

## Testing

`KirbyTestingModule` with `kirbyTestingOverride` (or `overrideKirbyImports`) replaces the container and the building blocks with mocks, so component tests can render the grid markup without Kirby's ARIA logic. The grid's own behavior is tested in Kirby.

## Anti-patterns

- Leaving out a building block on a `tr`, `th` or `td` → every element gets its directive
- Wrapping the grid in a custom container to look like a card → use `kirby-card`
- Writing `role`, `aria-sort`, `aria-selected` or the indices by hand → the building blocks set them
- Building your own sort button or selection checkbox → register the feature, or use `kirbyDataGridSelectionColumn`
- Selecting a row by clicking it → only the checkbox selects; a row click is free for opening details
- Leaving out `getRowId` → selection attaches to the wrong rows after sorting or reloading
- Registering features the grid doesn't use, or client row models (`sortedRowModel`) for server-side data → they are bundled for nothing
- Storing the updater function with `signal.set(updater)` → resolve it with `functionalUpdate(updater, current)`
