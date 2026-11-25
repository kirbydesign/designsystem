import { Component, computed, linkedSignal, resource, signal } from '@angular/core';
import {
  ColumnDef,
  columnFilteringFeature,
  ColumnFiltersState,
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
import {
  SegmentedControlComponent,
  SegmentItem,
} from '@kirbydesign/designsystem/segmented-control';

type Payment = { id: string; recipient: string; status: string; amount: number };

const features = tableFeatures({ rowSortingFeature, columnFilteringFeature, rowSelectionFeature });

const columns: ColumnDef<typeof features, Payment>[] = [
  kirbyDataGridSelectionColumn({ rowLabel: (payment: Payment) => payment.recipient }),
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  { accessorKey: 'amount', header: 'Amount' },
];

const allPayments: Payment[] = [
  { id: '1', recipient: 'Acme A/S', status: 'Awaiting approval', amount: 12500 },
  { id: '2', recipient: 'Nordic Supplies ApS', status: 'Approved', amount: 3200.5 },
  { id: '3', recipient: 'Jensen & Co', status: 'Rejected', amount: 87 },
  { id: '4', recipient: 'Bager Hansen', status: 'Approved', amount: 450 },
  { id: '5', recipient: 'Østergaard Transport', status: 'Awaiting approval', amount: 23999 },
];

const ALL = 'all';

// No payment is cancelled, so that filter shows an empty result.
const statusItems: SegmentItem[] = [
  { id: ALL, text: 'All' },
  { id: 'Awaiting approval', text: 'Awaiting approval' },
  { id: 'Approved', text: 'Approved' },
  { id: 'Rejected', text: 'Rejected' },
  { id: 'Cancelled', text: 'Cancelled' },
];

// Stands in for a backend that filters and sorts: the grid renders the rows it receives.
async function fetchPayments(
  sorting: SortingState,
  filters: ColumnFiltersState
): Promise<Payment[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const filtered = allPayments.filter((payment) =>
    filters.every(({ id, value }) => payment[id as keyof Payment] === value)
  );
  const [sort] = sorting;
  if (!sort) return filtered;
  const key = sort.id as keyof Payment;
  const direction = sort.desc ? -1 : 1;
  return [...filtered].sort((a, b) => (a[key] > b[key] ? 1 : -1) * direction);
}

const config = {
  selector: 'cookbook-data-grid-filtering-example',
  template: `<div class="toolbar">
  <kirby-segmented-control
    mode="chip"
    size="sm"
    [items]="statusItems"
    [selectedIndex]="0"
    (segmentSelect)="onStatusSelect($event)"
  ></kirby-segmented-control>
  <p>{{ selectedCount() }} selected, {{ hiddenSelectedCount() }} not shown</p>
</div>

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
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: `
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--kirby-spacing-s);
      margin-block-end: var(--kirby-spacing-s);
    }

    .toolbar p {
      margin: 0;
    }
  `,
  imports: [
    CardComponent,
    SegmentedControlComponent,
    DataGridComponent,
    DataGridTableDirective,
    DataGridHeaderRowDirective,
    DataGridHeaderCellComponent,
    DataGridRowDirective,
    DataGridCellDirective,
    FlexRender,
  ],
})
export class DataGridFilteringExampleComponent {
  template: string = config.template;
  readonly statusItems = statusItems;

  readonly sorting = signal<SortingState>([]);
  readonly columnFilters = signal<ColumnFiltersState>([]);
  readonly rowSelection = signal<RowSelectionState>({});

  readonly page = resource({
    params: () => ({ sorting: this.sorting(), filters: this.columnFilters() }),
    loader: ({ params }) => fetchPayments(params.sorting, params.filters),
  });

  // Keeps showing the previous rows while the next page loads.
  readonly payments = linkedSignal<Payment[] | undefined, Payment[]>({
    source: () => this.page.value(),
    computation: (page, previous) => page ?? previous?.value ?? [],
  });

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.payments(),
    getRowId: (payment) => payment.id,
    enableRowSelection: (row) => row.original.status !== 'Rejected',
    manualSorting: true,
    manualFiltering: true,
    enableMultiSort: false,
    enableSortingRemoval: false,
    sortDescFirst: false,
    state: {
      sorting: this.sorting(),
      columnFilters: this.columnFilters(),
      rowSelection: this.rowSelection(),
    },
    onSortingChange: (updater) => this.sorting.set(functionalUpdate(updater, this.sorting())),
    onColumnFiltersChange: (updater) =>
      this.columnFilters.set(functionalUpdate(updater, this.columnFilters())),
    onRowSelectionChange: (updater) =>
      this.rowSelection.set(functionalUpdate(updater, this.rowSelection())),
  }));

  // Selection is keyed by row ID, so rows the filter hides stay selected.
  readonly selectedCount = computed(() => Object.keys(this.rowSelection()).length);
  readonly hiddenSelectedCount = computed(() => {
    const shown = new Set(this.payments().map((payment) => payment.id));
    return Object.keys(this.rowSelection()).filter((id) => !shown.has(id)).length;
  });

  onStatusSelect(item: SegmentItem): void {
    this.table.getColumn('status')?.setFilterValue(item.id === ALL ? undefined : item.id);
  }

  dataSnippet = `const features = tableFeatures({ rowSortingFeature, columnFilteringFeature, rowSelectionFeature });

readonly sorting = signal<SortingState>([]);
readonly columnFilters = signal<ColumnFiltersState>([]);
readonly rowSelection = signal<RowSelectionState>({});

// The backend filters and sorts: the state is part of the request.
readonly page = resource({
  params: () => ({ sorting: this.sorting(), filters: this.columnFilters() }),
  loader: ({ params }) => fetchPayments(params.sorting, params.filters),
});

readonly table = injectTable(() => ({
  features,
  columns,
  data: this.payments(),
  getRowId: (payment) => payment.id,
  manualSorting: true,
  manualFiltering: true, // trust the filtered rows from the backend
  …
  state: {
    sorting: this.sorting(),
    columnFilters: this.columnFilters(),
    rowSelection: this.rowSelection(),
  },
  onColumnFiltersChange: (updater) =>
    this.columnFilters.set(functionalUpdate(updater, this.columnFilters())),
  …
}));

// The segmented control filters through TanStack's column API.
onStatusSelect(item: SegmentItem): void {
  this.table.getColumn('status')?.setFilterValue(item.id === 'all' ? undefined : item.id);
}`;
}
