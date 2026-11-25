import { Component, signal } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ColumnDef, FlexRender, injectTable, tableFeatures } from '@tanstack/angular-table';

import { DataGridCellDirective } from './data-grid-cell.directive';
import { DataGridHeaderCellComponent } from './data-grid-header-cell.component';
import { DataGridHeaderRowDirective } from './data-grid-header-row.directive';
import { DataGridRowDirective } from './data-grid-row.directive';
import { DataGridTableDirective } from './data-grid-table.directive';
import { DataGridComponent, KirbyDataGridSize } from './data-grid.component';

type Payment = { id: string; recipient: string; amount: number; currency: string };

const features = tableFeatures({});

const flatColumns: ColumnDef<typeof features, Payment>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'currency', header: 'Currency' },
];

const groupedColumns: ColumnDef<typeof features, Payment>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  {
    id: 'payment',
    header: 'Payment',
    columns: [
      { accessorKey: 'amount', header: 'Amount' },
      { accessorKey: 'currency', header: 'Currency' },
    ],
  },
];

const payments: Payment[] = [
  { id: 'a', recipient: 'Acme A/S', amount: 12500, currency: 'DKK' },
  { id: 'b', recipient: 'Nordic Supplies ApS', amount: 3200, currency: 'EUR' },
  { id: 'c', recipient: 'Jensen & Co', amount: 87, currency: 'DKK' },
];

@Component({
  template: `
    <kirby-data-grid [table]="table" label="Payments" [size]="size()">
      <table kirbyDataGridTable>
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
            <tr [kirbyDataGridRow]="row" [attr.data-row-id]="row.id">
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
  `,
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
class TestHostComponent {
  readonly size = signal<KirbyDataGridSize>('md');
  readonly columns = signal(flatColumns);
  readonly data = signal(payments);

  readonly table = injectTable(() => ({
    features,
    columns: this.columns(),
    data: this.data(),
    getRowId: (payment) => payment.id,
  }));
}

describe('DataGridComponent', () => {
  let spectator: Spectator<TestHostComponent>;

  const createHost = createComponentFactory(TestHostComponent);

  const grid = () => spectator.query(DataGridComponent);
  const attr = (selector: string, name: string) =>
    spectator.queryAll(selector).map((element) => element.getAttribute(name));

  beforeEach(() => {
    spectator = createHost();
  });

  describe('container', () => {
    it('should create', () => {
      expect(grid()).toBeTruthy();
    });

    it('should project the table', () => {
      expect(spectator.query('kirby-data-grid > table')).toBeTruthy();
    });

    it('should have size md by default', () => {
      expect(spectator.query('kirby-data-grid')).toHaveAttribute('data-size', 'md');
    });

    it('should reflect a changed size', () => {
      spectator.component.size.set('sm');
      spectator.detectChanges();

      expect(spectator.query('kirby-data-grid')).toHaveAttribute('data-size', 'sm');
    });

    it('should count one header row', () => {
      expect(grid().headerRowCount).toBe(1);
    });

    it('should count header rows and data rows', () => {
      expect(grid().totalRowCount).toBe(4);
    });

    it('should count the leaf columns', () => {
      expect(grid().columnCount).toBe(3);
    });

    it('should return 1-based row indices after the header rows', () => {
      expect(grid().getRowIndex('a')).toBe(2);
      expect(grid().getRowIndex('c')).toBe(4);
    });

    it('should return 1-based column indices', () => {
      expect(grid().getColumnIndex('recipient')).toBe(1);
      expect(grid().getColumnIndex('currency')).toBe(3);
    });
  });

  describe('table', () => {
    it('should not set aria-multiselectable without rowSelectionFeature', () => {
      expect(spectator.query('table')).not.toHaveAttribute('aria-multiselectable');
    });

    it('should have role grid', () => {
      expect(spectator.query('table')).toHaveAttribute('role', 'grid');
    });

    it('should use the label as accessible name', () => {
      expect(spectator.query('table')).toHaveAttribute('aria-label', 'Payments');
    });

    it('should set aria-rowcount to header rows plus data rows', () => {
      expect(spectator.query('table')).toHaveAttribute('aria-rowcount', '4');
    });

    it('should set aria-colcount to the number of columns', () => {
      expect(spectator.query('table')).toHaveAttribute('aria-colcount', '3');
    });

    it('should update aria-rowcount when data changes', () => {
      spectator.component.data.set(payments.slice(0, 1));
      spectator.detectChanges();

      expect(spectator.query('table')).toHaveAttribute('aria-rowcount', '2');
    });
  });

  describe('rows and cells', () => {
    it('should set aria-rowindex 1 on the header row', () => {
      expect(attr('thead tr', 'aria-rowindex')).toEqual(['1']);
    });

    it('should set aria-rowindex on data rows after the header row', () => {
      expect(attr('tbody tr', 'aria-rowindex')).toEqual(['2', '3', '4']);
    });

    it('should set aria-colindex on header cells', () => {
      expect(attr('th', 'aria-colindex')).toEqual(['1', '2', '3']);
    });

    it('should set aria-colindex on data cells', () => {
      expect(attr('tbody tr:first-child td', 'aria-colindex')).toEqual(['1', '2', '3']);
    });

    it('should follow the displayed order when rows are reordered', () => {
      spectator.component.data.set([...payments].reverse());
      spectator.detectChanges();

      expect(spectator.query('tr[data-row-id="c"]')).toHaveAttribute('aria-rowindex', '2');
      expect(spectator.query('tr[data-row-id="a"]')).toHaveAttribute('aria-rowindex', '4');
    });
  });

  describe('with grouped columns', () => {
    beforeEach(() => {
      spectator.component.columns.set(groupedColumns);
      spectator.detectChanges();
    });

    it('should count two header rows', () => {
      expect(grid().headerRowCount).toBe(2);
    });

    it('should set aria-rowindex on both header rows', () => {
      expect(attr('thead tr', 'aria-rowindex')).toEqual(['1', '2']);
    });

    it('should start data rows after both header rows', () => {
      expect(attr('tbody tr', 'aria-rowindex')).toEqual(['3', '4', '5']);
    });

    it('should set colspan on a group header', () => {
      const groupHeader = spectator.queryAll('thead tr:first-child th')[1];

      expect(groupHeader).toHaveText('Payment');
      expect(groupHeader).toHaveAttribute('colspan', '2');
    });

    it('should not set colspan on headers spanning one column', () => {
      expect(attr('thead tr:last-child th', 'colspan')).toEqual([null, null, null]);
    });

    it('should set aria-colindex of a group header to its first column', () => {
      expect(attr('thead tr:first-child th', 'aria-colindex')).toEqual(['1', '2']);
    });
  });
});
