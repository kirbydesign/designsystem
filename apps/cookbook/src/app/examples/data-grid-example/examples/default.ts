import { Component, signal } from '@angular/core';
import { ColumnDef, FlexRender, injectTable, tableFeatures } from '@tanstack/angular-table';

import {
  DataGridCellDirective,
  DataGridComponent,
  DataGridHeaderCellComponent,
  DataGridHeaderRowDirective,
  DataGridRowDirective,
  DataGridTableDirective,
} from '@kirbydesign/designsystem/data-grid';

type Payment = { id: string; recipient: string; status: string; amount: string };

const features = tableFeatures({});

const columns: ColumnDef<typeof features, Payment>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'amount', header: 'Amount' },
];

const config = {
  selector: 'cookbook-data-grid-default-example',
  template: `<kirby-data-grid [table]="table" label="Payments">
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
</kirby-data-grid>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    DataGridComponent,
    DataGridTableDirective,
    DataGridHeaderRowDirective,
    DataGridHeaderCellComponent,
    DataGridRowDirective,
    DataGridCellDirective,
    FlexRender,
  ],
})
export class DataGridDefaultExampleComponent {
  template: string = config.template;

  readonly payments = signal<Payment[]>([
    { id: '1', recipient: 'Acme A/S', status: 'Awaiting approval', amount: '12.500,00' },
    { id: '2', recipient: 'Nordic Supplies ApS', status: 'Approved', amount: '3.200,50' },
    { id: '3', recipient: 'Jensen & Co', status: 'Rejected', amount: '87,00' },
  ]);

  readonly table = injectTable(() => ({
    features,
    columns,
    data: this.payments(),
    getRowId: (payment) => payment.id,
  }));

  dataSnippet = `type Payment = { id: string; recipient: string; status: string; amount: string };

const features = tableFeatures({});

const columns: ColumnDef<typeof features, Payment>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'amount', header: 'Amount' },
];

readonly payments = signal<Payment[]>(${JSON.stringify(this.payments(), null, 2)});

readonly table = injectTable(() => ({
  features,
  columns,
  data: this.payments(),
  getRowId: (payment) => payment.id,
}));`;
}
