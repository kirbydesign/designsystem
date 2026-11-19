import { Component, signal } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import {
  ColumnDef,
  FlexRender,
  injectTable,
  rowSortingFeature,
  SortingState,
  tableFeatures,
} from '@tanstack/angular-table';

import { IconComponent } from '@kirbydesign/designsystem/icon';

import { DataGridHeaderCellComponent } from './data-grid-header-cell.component';
import { DataGridHeaderRowDirective } from './data-grid-header-row.directive';
import { DataGridTableDirective } from './data-grid-table.directive';
import { DataGridComponent } from './data-grid.component';

type Payment = { id: string; recipient: string; status: string; amount: number };

const sortingFeatures = tableFeatures({ rowSortingFeature });
const noFeatures = tableFeatures({});

const columns: ColumnDef<typeof sortingFeatures, Payment>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  { accessorKey: 'amount', header: 'Amount' },
];

const columnsWithoutSorting: ColumnDef<typeof noFeatures, Payment>[] = [
  { accessorKey: 'recipient', header: 'Recipient' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'amount', header: 'Amount' },
];

const payments: Payment[] = [
  { id: 'a', recipient: 'Acme A/S', status: 'Approved', amount: 12500 },
  { id: 'b', recipient: 'Jensen & Co', status: 'Rejected', amount: 87 },
];

const template = `
  <kirby-data-grid [table]="table" label="Payments">
    <table class="kirby-table" kirbyDataGridTable>
      <thead>
        @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
          <tr [kirbyDataGridHeaderRow]="headerGroup">
            @for (header of headerGroup.headers; track header.id) {
              <th [kirbyDataGridHeaderCell]="header" [attr.data-column-id]="header.column.id">
                <ng-container *flexRenderHeader="header; let value">{{ value }}</ng-container>
              </th>
            }
          </tr>
        }
      </thead>
    </table>
  </kirby-data-grid>
`;

const imports = [
  DataGridComponent,
  DataGridTableDirective,
  DataGridHeaderRowDirective,
  DataGridHeaderCellComponent,
  FlexRender,
];

@Component({ template, imports })
class SortingHostComponent {
  readonly sorting = signal<SortingState>([]);

  readonly table = injectTable(() => ({
    features: sortingFeatures,
    columns,
    data: payments,
    getRowId: (payment) => payment.id,
    manualSorting: true,
    enableMultiSort: false,
    enableSortingRemoval: false,
    sortDescFirst: false,
    state: { sorting: this.sorting() },
    onSortingChange: (updater) =>
      typeof updater === 'function' ? this.sorting.update(updater) : this.sorting.set(updater),
  }));
}

@Component({ template, imports })
class NoSortingHostComponent {
  readonly table = injectTable(() => ({
    features: noFeatures,
    columns: columnsWithoutSorting,
    data: payments,
    getRowId: (payment) => payment.id,
  }));
}

describe('DataGridHeaderCellComponent', () => {
  describe('without rowSortingFeature', () => {
    let spectator: Spectator<NoSortingHostComponent>;

    const createHost = createComponentFactory(NoSortingHostComponent);

    beforeEach(() => {
      spectator = createHost();
    });

    it('should render the header text without a button', () => {
      expect(spectator.query('th button')).toBeNull();
      expect(spectator.query('th[data-column-id="recipient"]')).toHaveText('Recipient');
    });

    it('should not be sortable', () => {
      expect(spectator.query('th.sortable')).toBeNull();
    });

    it('should not set aria-sort', () => {
      expect(spectator.query('th[aria-sort]')).toBeNull();
    });
  });

  describe('with rowSortingFeature', () => {
    let spectator: Spectator<SortingHostComponent>;

    const createHost = createComponentFactory(SortingHostComponent);

    const header = (columnId: string) =>
      spectator.query<HTMLTableCellElement>(`th[data-column-id="${columnId}"]`);
    const sortButton = (columnId: string) =>
      spectator.query<HTMLButtonElement>(`th[data-column-id="${columnId}"] button`);
    const icon = (columnId: string) =>
      spectator.query(`th[data-column-id="${columnId}"] kirby-icon`, { read: IconComponent });
    const clickSort = (columnId: string) => {
      spectator.click(sortButton(columnId));
      spectator.detectChanges();
    };

    beforeEach(() => {
      spectator = createHost();
    });

    describe('by default', () => {
      it('should render a sort button in sortable columns', () => {
        expect(sortButton('recipient')).toHaveText('Recipient');
        expect(sortButton('amount')).toHaveText('Amount');
      });

      it('should not render a sort button when the column disables sorting', () => {
        expect(sortButton('status')).toBeNull();
        expect(header('status')).toHaveText('Status');
      });

      it('should add the sortable class to sortable columns only', () => {
        expect(header('recipient')).toHaveClass('sortable');
        expect(header('status')).not.toHaveClass('sortable');
      });

      it('should not mark any column as sorted', () => {
        expect(spectator.query('th.active')).toBeNull();
        expect(spectator.query('th[aria-sort]')).toBeNull();
      });

      it('should show the ascending icon', () => {
        expect(icon('amount').name).toBe('arrow-up-fill');
      });

      it('should copy the label text to data-text, to reserve the bold width', () => {
        expect(spectator.query('th[data-column-id="amount"] button span')).toHaveAttribute(
          'data-text',
          'Amount'
        );
      });
    });

    describe('when a sortable header is clicked', () => {
      beforeEach(() => {
        clickSort('amount');
      });

      it('should sort ascending first', () => {
        expect(spectator.component.sorting()).toEqual([{ id: 'amount', desc: false }]);
      });

      it('should set aria-sort ascending', () => {
        expect(header('amount')).toHaveAttribute('aria-sort', 'ascending');
      });

      it('should add the active class', () => {
        expect(header('amount')).toHaveClass('active');
      });

      it('should toggle to descending when clicked again', () => {
        clickSort('amount');

        expect(spectator.component.sorting()).toEqual([{ id: 'amount', desc: true }]);
        expect(header('amount')).toHaveAttribute('aria-sort', 'descending');
      });

      it('should toggle back to ascending, never to unsorted', () => {
        clickSort('amount');
        clickSort('amount');

        expect(spectator.component.sorting()).toEqual([{ id: 'amount', desc: false }]);
      });

      it('should move the sorting when another header is clicked', () => {
        clickSort('recipient');

        expect(spectator.component.sorting()).toEqual([{ id: 'recipient', desc: false }]);
        expect(header('recipient')).toHaveAttribute('aria-sort', 'ascending');
        expect(header('amount')).not.toHaveAttribute('aria-sort');
        expect(header('amount')).not.toHaveClass('active');
      });
    });

    describe('when the sorting state is set by the consumer', () => {
      beforeEach(() => {
        spectator.component.sorting.set([{ id: 'recipient', desc: true }]);
        spectator.detectChanges();
      });

      it('should reflect it in aria-sort', () => {
        expect(header('recipient')).toHaveAttribute('aria-sort', 'descending');
      });

      it('should show the descending icon', () => {
        expect(icon('recipient').name).toBe('arrow-down-fill');
      });
    });
  });
});
