# Server-side data

The backend sorts and filters (and later pages). TanStack only holds the state, and `manualSorting: true` makes it render the rows in the order they arrive. It never calls the backend itself.

```ts
import { Component, linkedSignal, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import {
  ColumnDef,
  FlexRender,
  functionalUpdate,
  injectTable,
  rowSelectionFeature,
  RowSelectionState,
  rowSortingFeature,
  SortingState,
  tableFeatures,
} from '@tanstack/angular-table';
import { CardComponent } from '@kirbydesign/designsystem/card';
import {
  DataGridCellDirective,
  DataGridComponent,
  DataGridHeaderCellComponent,
  DataGridHeaderRowDirective,
  DataGridRowDirective,
  DataGridTableDirective,
  kirbyDataGridSelectionColumn,
} from '@kirbydesign/designsystem/data-grid';

type Payment = { id: string; recipient: string; status: string; amount: number };

const features = tableFeatures({ rowSortingFeature, rowSelectionFeature });

const columns: ColumnDef<typeof features, Payment>[] = [
  kirbyDataGridSelectionColumn({ rowLabel: (payment: Payment) => payment.recipient }),
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  { accessorKey: 'amount', header: 'Amount' },
];

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html', // the markup from SKILL.md
  imports: [
    CardComponent,
    DataGridComponent,
    DataGridTableDirective,
    DataGridHeaderRowDirective,
    DataGridHeaderCellComponent,
    DataGridRowDirective,
    DataGridCellDirective,
    FlexRender,
  ],
})
export class PaymentsComponent {
  readonly sorting = signal<SortingState>([]);
  readonly rowSelection = signal<RowSelectionState>({});

  // The sorting state is part of the request, so changing it fetches again.
  readonly page = httpResource<Payment[]>(() => ({
    url: '/api/payments',
    params: toSortParams(this.sorting()),
  }));

  // Keeps showing the previous rows while the next sorted page loads, instead of an empty grid.
  readonly payments = linkedSignal<Payment[] | undefined, Payment[]>({
    source: () => this.page.value(),
    computation: (page, previous) => page ?? previous?.value ?? [],
  });

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.payments(),
    getRowId: (payment) => payment.id,
    manualSorting: true,
    enableMultiSort: false,
    enableSortingRemoval: false,
    sortDescFirst: false,
    state: { sorting: this.sorting(), rowSelection: this.rowSelection() },
    onSortingChange: (updater) => this.sorting.set(functionalUpdate(updater, this.sorting())),
    onRowSelectionChange: (updater) =>
      this.rowSelection.set(functionalUpdate(updater, this.rowSelection())),
  }));
}

function toSortParams(sorting: SortingState): Record<string, string> {
  const [sort] = sorting;
  return sort ? { sort: sort.id, direction: sort.desc ? 'desc' : 'asc' } : {};
}
```

Notes:

- **Selection survives sorting and reloads**, because it is keyed by `getRowId`. Selected rows that are no longer loaded stay in `rowSelection`; remove IDs yourself when items are deleted.
- **Map the sorting state to whatever the API expects.** `toSortParams` is an example; the column `id` (here the `accessorKey`) is what TanStack puts in `SortingState`.
- **Filtering works the same way:** register `columnFilteringFeature`, add a `columnFilters` signal to `state` and `onColumnFiltersChange`, set `manualFiltering: true`, and add the filters to the request params next to the sorting.
- **Don't register `sortedRowModel`** for server-side data. It would sort the loaded rows a second time on the client.
