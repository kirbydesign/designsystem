import { Component, linkedSignal, resource, signal } from '@angular/core';
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

const allPayments: Payment[] = [
  { id: '1', recipient: 'Acme A/S', status: 'Awaiting approval', amount: 12500 },
  { id: '2', recipient: 'Nordic Supplies ApS', status: 'Approved', amount: 3200.5 },
  { id: '3', recipient: 'Jensen & Co', status: 'Rejected', amount: 87 },
  { id: '4', recipient: 'Bager Hansen', status: 'Approved', amount: 450 },
  { id: '5', recipient: 'Østergaard Transport', status: 'Awaiting approval', amount: 23999 },
];

// Stands in for a backend that sorts: the grid renders rows in the order it receives them.
async function fetchPayments(sorting: SortingState): Promise<Payment[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const [sort] = sorting;
  if (!sort) return allPayments;
  const key = sort.id as keyof Payment;
  const direction = sort.desc ? -1 : 1;
  return [...allPayments].sort((a, b) => (a[key] > b[key] ? 1 : -1) * direction);
}

const config = {
  selector: 'cookbook-data-grid-selection-example',
  template: `<p>{{ selectedCount() }} selected</p>
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
export class DataGridSelectionExampleComponent {
  template: string = config.template;

  readonly sorting = signal<SortingState>([]);
  readonly rowSelection = signal<RowSelectionState>({});
  readonly selectedCount = () => Object.keys(this.rowSelection()).length;

  readonly page = resource({
    params: () => ({ sorting: this.sorting() }),
    loader: ({ params }) => fetchPayments(params.sorting),
  });

  // Keeps showing the previous rows while the next sorted page loads.
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
    enableMultiSort: false,
    enableSortingRemoval: false,
    sortDescFirst: false,
    state: { sorting: this.sorting(), rowSelection: this.rowSelection() },
    onSortingChange: (updater) => this.sorting.set(functionalUpdate(updater, this.sorting())),
    onRowSelectionChange: (updater) =>
      this.rowSelection.set(functionalUpdate(updater, this.rowSelection())),
  }));

  dataSnippet = `const features = tableFeatures({ rowSortingFeature, rowSelectionFeature });

const columns: ColumnDef<typeof features, Payment>[] = [
  kirbyDataGridSelectionColumn({ rowLabel: (payment: Payment) => payment.recipient }),
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  { accessorKey: 'amount', header: 'Amount' },
];

readonly sorting = signal<SortingState>([]);
readonly rowSelection = signal<RowSelectionState>({});

readonly table = injectTable(() => ({
  features,
  columns,
  data: this.payments(),
  getRowId: (payment) => payment.id, // selection is keyed by row ID, so it survives sorting
  enableRowSelection: (row) => row.original.status !== 'Rejected',
  manualSorting: true,
  enableMultiSort: false,
  enableSortingRemoval: false,
  sortDescFirst: false,
  state: { sorting: this.sorting(), rowSelection: this.rowSelection() },
  onSortingChange: (updater) => this.sorting.set(functionalUpdate(updater, this.sorting())),
  onRowSelectionChange: (updater) =>
    this.rowSelection.set(functionalUpdate(updater, this.rowSelection())),
}));`;
}
