import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import {
  ColumnDef,
  FlexRender,
  functionalUpdate,
  injectTable,
  rowSelectionFeature,
  RowSelectionState,
  tableFeatures,
} from '@tanstack/angular-table';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { DataGridCellDirective } from './data-grid-cell.directive';
import { DataGridHeaderCellComponent } from './data-grid-header-cell.component';
import { DataGridHeaderRowDirective } from './data-grid-header-row.directive';
import { DataGridRowDirective } from './data-grid-row.directive';
import { kirbyDataGridSelectionColumn } from './data-grid-selection-column';
import { DataGridTableDirective } from './data-grid-table.directive';
import { DataGridComponent } from './data-grid.component';

type Payment = { id: string; recipient: string; status: string };

const features = tableFeatures({ rowSelectionFeature });

const columns: ColumnDef<typeof features, Payment>[] = [
  kirbyDataGridSelectionColumn({ rowLabel: (payment: Payment) => payment.recipient }),
  { accessorKey: 'recipient', header: 'Recipient' },
];

const payments: Payment[] = [
  { id: 'a', recipient: 'Acme A/S', status: 'Approved' },
  { id: 'b', recipient: 'Jensen & Co', status: 'Rejected' },
  { id: 'c', recipient: 'Cash $& Carry', status: 'Approved' },
];

@Component({
  template: `
    <kirby-data-grid [table]="table" label="Payments">
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
  readonly rowSelection = signal<RowSelectionState>({});

  readonly table = injectTable(() => ({
    features,
    columns,
    data: payments,
    getRowId: (payment) => payment.id,
    enableRowSelection: (row) => row.original.status !== 'Rejected',
    state: { rowSelection: this.rowSelection() },
    onRowSelectionChange: (updater) =>
      this.rowSelection.set(functionalUpdate(updater, this.rowSelection())),
  }));
}

describe('kirbyDataGridSelectionColumn', () => {
  let spectator: Spectator<TestHostComponent>;

  const createHost = createComponentFactory({
    component: TestHostComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  const row = (id: string) => spectator.query(`tr[data-row-id="${id}"]`);
  const checkbox = (selector: string): CheckboxComponent =>
    spectator.debugElement.query(By.css(`${selector} kirby-checkbox`)).componentInstance;
  const headerCheckbox = () => checkbox('thead');
  const rowCheckbox = (id: string) => checkbox(`tr[data-row-id="${id}"]`);
  const accessibleName = (checkbox: CheckboxComponent) => checkbox._labelText;

  const select = (checkbox: CheckboxComponent, checked: boolean) => {
    checkbox.checkedChange.emit(checked);
    spectator.detectChanges();
  };

  beforeEach(() => {
    spectator = createHost();
  });

  describe('by default', () => {
    it('should render a select-all checkbox in the header', () => {
      expect(accessibleName(headerCheckbox())).toBe('Select all rows');
    });

    it('should name each row checkbox after its row', () => {
      expect(accessibleName(rowCheckbox('a'))).toBe('Select Acme A/S');
    });

    it('should keep special replacement patterns in the row label as text', () => {
      expect(accessibleName(rowCheckbox('c'))).toBe('Select Cash $& Carry');
    });

    it('should disable the checkbox of a row that cannot be selected', () => {
      expect(rowCheckbox('b').disabled).toBeTrue();
      expect(rowCheckbox('a').disabled).toBeFalse();
    });

    it('should set aria-multiselectable on the table', () => {
      expect(spectator.query('table')).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('should set aria-selected false on selectable rows', () => {
      expect(row('a')).toHaveAttribute('aria-selected', 'false');
    });

    it('should not set aria-selected on rows that cannot be selected', () => {
      expect(row('b')).not.toHaveAttribute('aria-selected');
    });

    it('should count the selection column in aria-colcount', () => {
      expect(spectator.query('table')).toHaveAttribute('aria-colcount', '2');
    });
  });

  describe('when a row checkbox is checked', () => {
    beforeEach(() => {
      select(rowCheckbox('a'), true);
    });

    it('should select the row', () => {
      expect(spectator.component.rowSelection()).toEqual({ a: true });
    });

    it('should mark the row as selected', () => {
      expect(row('a')).toHaveAttribute('aria-selected', 'true');
      expect(row('a')).toHaveClass('selected');
    });

    it('should check the row checkbox', () => {
      expect(rowCheckbox('a').checked).toBeTrue();
    });

    it('should make the select-all checkbox indeterminate', () => {
      expect(headerCheckbox().indeterminate).toBeTrue();
      expect(headerCheckbox().checked).toBeFalse();
    });

    it('should deselect the row when unchecked', () => {
      select(rowCheckbox('a'), false);

      expect(spectator.component.rowSelection()).toEqual({});
      expect(row('a')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('when the selection cell is clicked outside the checkbox', () => {
    const cellOf = (selector: string) =>
      spectator.query(`${selector} .kirby-data-grid-selection-checkbox`);
    const clickCell = (selector: string) => {
      spectator.click(cellOf(selector));
      spectator.detectChanges();
    };

    it('should toggle the row', () => {
      clickCell('tr[data-row-id="a"]');
      expect(spectator.component.rowSelection()).toEqual({ a: true });

      clickCell('tr[data-row-id="a"]');
      expect(spectator.component.rowSelection()).toEqual({});
    });

    it('should not select a row that cannot be selected', () => {
      clickCell('tr[data-row-id="b"]');

      expect(spectator.component.rowSelection()).toEqual({});
    });

    it('should toggle all rows from the header cell', () => {
      clickCell('thead');
      expect(spectator.component.rowSelection()).toEqual({ a: true, c: true });

      clickCell('thead');
      expect(spectator.component.rowSelection()).toEqual({});
    });

    it('should leave clicks on the checkbox itself to the checkbox', () => {
      spectator.click(spectator.query('tr[data-row-id="a"] kirby-checkbox'));
      spectator.detectChanges();

      expect(spectator.component.rowSelection()).toEqual({});
    });
  });

  describe('when the select-all checkbox is checked', () => {
    beforeEach(() => {
      select(headerCheckbox(), true);
    });

    it('should select every row that can be selected', () => {
      expect(spectator.component.rowSelection()).toEqual({ a: true, c: true });
    });

    it('should check the select-all checkbox', () => {
      expect(headerCheckbox().checked).toBeTrue();
      expect(headerCheckbox().indeterminate).toBeFalse();
    });

    it('should clear the selection when unchecked', () => {
      select(headerCheckbox(), false);

      expect(spectator.component.rowSelection()).toEqual({});
    });
  });
});
