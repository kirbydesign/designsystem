import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import {
  type CellContext,
  type ColumnDef,
  ComposableDataGridComponent,
  createSortedRowModel,
  DataGridCellComponent,
  DataGridHeaderCellComponent,
  DataGridSidePanelTriggerDirective,
  DataGridTableDirective,
  flexRenderComponent,
  injectFlexRenderContext,
  sortFn_alphanumeric,
  sortFn_text,
  stockFeatures,
  tableFeatures,
  type TableFeatures,
} from '@kirbydesign/designsystem/data-grid-composable';
import {
  type OrderCorrection,
  OrderDetailsSidePanelComponent,
  type ReconciliationOrder,
  type ReconciliationStatus,
} from './order-details-side-panel.component';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const initialOrders: ReconciliationOrder[] = [
  {
    id: 'ord-1048',
    orderNumber: 'ORD-1048',
    customer: 'Nora Jensen',
    fulfillmentCenter: 'Copenhagen',
    status: 'Needs review',
    total: 1240.5,
    trackingNumber: 'DK-7729-1048',
    lineItems: [
      { sku: 'LMP-04', description: 'Desk lamp', quantity: 2, unitPrice: 420 },
      { sku: 'CAB-12', description: 'Cable kit', quantity: 1, unitPrice: 400.5 },
    ],
    shipmentEvents: [
      { date: 'Oct 26, 09:14', description: 'Shipment delayed at sorting hub' },
      { date: 'Oct 25, 16:42', description: 'Picked up by carrier' },
    ],
  },
  {
    id: 'ord-1049',
    orderNumber: 'ORD-1049',
    customer: 'Malik Andersen',
    fulfillmentCenter: 'Aarhus',
    status: 'Reconciled',
    total: 685,
    trackingNumber: 'DK-8814-1049',
    lineItems: [{ sku: 'CHR-08', description: 'Dining chair', quantity: 1, unitPrice: 685 }],
    shipmentEvents: [
      { date: 'Oct 26, 12:08', description: 'Delivered to customer' },
      { date: 'Oct 26, 07:31', description: 'Out for delivery' },
    ],
  },
  {
    id: 'ord-1050',
    orderNumber: 'ORD-1050',
    customer: 'Sofia Madsen',
    fulfillmentCenter: 'Copenhagen',
    status: 'Needs review',
    total: 2189.99,
    trackingNumber: 'DK-5530-1050',
    lineItems: [
      { sku: 'DSK-22', description: 'Writing desk', quantity: 1, unitPrice: 1999.99 },
      { sku: 'MAT-03', description: 'Desk mat', quantity: 1, unitPrice: 190 },
    ],
    shipmentEvents: [
      { date: 'Oct 26, 18:05', description: 'Delivery fee differs from invoice' },
      { date: 'Oct 25, 11:20', description: 'Shipment packed' },
    ],
  },
  {
    id: 'ord-1051',
    orderNumber: 'ORD-1051',
    customer: 'Elias Holm',
    fulfillmentCenter: 'Odense',
    status: 'Reconciled',
    total: 349.95,
    trackingNumber: 'DK-2048-1051',
    lineItems: [{ sku: 'SHE-16', description: 'Wall shelf', quantity: 3, unitPrice: 116.65 }],
    shipmentEvents: [
      { date: 'Oct 26, 14:52', description: 'Delivered to parcel shop' },
      { date: 'Oct 25, 08:03', description: 'Shipment accepted' },
    ],
  },
  {
    id: 'ord-1052',
    orderNumber: 'ORD-1052',
    customer: 'Freja Larsen',
    fulfillmentCenter: 'Aarhus',
    status: 'Needs review',
    total: 979,
    trackingNumber: 'DK-9907-1052',
    lineItems: [
      { sku: 'STL-05', description: 'Floor stool', quantity: 1, unitPrice: 579 },
      { sku: 'LGT-02', description: 'Reading light', quantity: 1, unitPrice: 400 },
    ],
    shipmentEvents: [
      { date: 'Oct 26, 10:17', description: 'Weight adjustment needs review' },
      { date: 'Oct 25, 13:46', description: 'Picked up by carrier' },
    ],
  },
];

@Component({
  selector: 'cookbook-order-reconciliation-status-cell',
  template: `
    <kirby-badge [themeColor]="themeColor">{{ cell.getValue() }}</kirby-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
})
class OrderStatusCellComponent {
  readonly cell =
    injectFlexRenderContext<
      CellContext<TableFeatures, ReconciliationOrder, ReconciliationStatus>
    >();

  get themeColor() {
    return this.cell.getValue() === 'Reconciled' ? 'success' : 'warning';
  }
}

const columns: ColumnDef<TableFeatures, ReconciliationOrder>[] = [
  { accessorKey: 'orderNumber', header: 'Order' },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'fulfillmentCenter', header: 'Fulfillment' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(OrderStatusCellComponent),
  },
  {
    accessorKey: 'total',
    header: 'Order total',
    cell: (context) => currencyFormatter.format(context.getValue<number>()),
  },
  { id: 'details', header: 'Actions', cell: () => '', enableSorting: false },
];

const config = {
  selector: 'cookbook-order-reconciliation-example',
  template: `<kirby-data-grid-composable
    #grid="kirbyDataGridComposable"
    [data]="orders()"
    [columns]="columns"
    [tableOptions]="tableOptions"
  >
    @let visibleRows = grid.table.getRowModel().rows;
    <table kirbyDataGridTable class="order-reconciliation-table" aria-label="Orders grid">
            <caption>Orders and shipment status</caption>
            <thead>
              @for (headerGroup of grid.table.getHeaderGroups(); track headerGroup.id) {
                <tr>
                  @for (header of headerGroup.headers; track header.id) {
                    <th
                      kirby-data-grid-header-cell
                      [headerContext]="header.getContext()"
                      [attr.colspan]="header.colSpan"
                      [attr.data-column-id]="header.column.id"
                    ></th>
                  }
                </tr>
              }
            </thead>
            <tbody>
              @for (row of visibleRows; track row.id) {
                <tr
                  [class.order-reconciliation-row-active]="
                    grid.sidePanelOpen() && grid.sidePanelContext() === row.original.id
                  "
                >
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    @if (cell.column.id === 'details') {
                      <td data-column-id="details">
                        <button
                          class="order-reconciliation-details-toggle"
                          type="button"
                          [attr.aria-label]="'Open details for order ' + row.original.orderNumber"
                          [kirbyDataGridSidePanelTrigger]="row.original.id"
                        >
                          Details
                        </button>
                      </td>
                    } @else {
                      <td
                        kirby-data-grid-cell
                        [cellContext]="cell.getContext()"
                        [attr.data-column-id]="cell.column.id"
                      ></td>
                    }
                  }
                </tr>
              } @empty {
                <tr>
                  <td class="order-reconciliation-empty" colspan="6">No orders available.</td>
                </tr>
              }
            </tbody>
    </table>
    <cookbook-order-details-side-panel
      kirbyDataGridSidePanel
      [order]="getSidePanelOrder(grid.sidePanelContext())"
      (closed)="grid.closeSidePanel()"
      (correctionApplied)="applyCorrection($event)"
    ></cookbook-order-details-side-panel>
  </kirby-data-grid-composable>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./order-reconciliation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComposableDataGridComponent,
    DataGridTableDirective,
    DataGridHeaderCellComponent,
    DataGridCellComponent,
    DataGridSidePanelTriggerDirective,
    OrderDetailsSidePanelComponent,
  ],
})
export class DataGridOrderReconciliationExampleComponent {
  readonly orders = signal(initialOrders);
  readonly columns = columns;
  readonly tableOptions = {
    features: tableFeatures({
      ...stockFeatures,
      sortedRowModel: createSortedRowModel(),
      sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
    }),
    enableSorting: true,
    getRowId: (order: ReconciliationOrder) => order.id,
    initialState: {
      sorting: [{ id: 'orderNumber', desc: true }],
    },
  };

  template: string = config.template;
  dataSnippet = `const tableOptions = {
  features: tableFeatures({
    ...stockFeatures,
    sortedRowModel: createSortedRowModel(),
    sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
  }),
  enableSorting: true,
  getRowId: (order: ReconciliationOrder) => order.id,
};

applyCorrection(correction: OrderCorrection) {
  if (!Number.isFinite(correction.amount) || correction.amount === 0) return;

  this.orders.update((orders) =>
    orders.map((order) =>
      order.id === correction.orderId
        ? { ...order, total: order.total + correction.amount }
        : order,
    ),
  );
}`;

  getSidePanelOrder(context: unknown) {
    return typeof context === 'string'
      ? (this.orders().find((order) => order.id === context) ?? null)
      : null;
  }

  applyCorrection(correction: OrderCorrection) {
    this.orders.update((orders) =>
      orders.map((order) =>
        order.id === correction.orderId
          ? { ...order, total: order.total + correction.amount }
          : order
      )
    );
  }
}
