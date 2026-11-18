import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RowData, Table, TableFeatures } from '@tanstack/angular-table';

export type KirbyDataGridSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'kirby-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent<TFeatures extends TableFeatures, TData extends RowData> {
  @Input({ required: true })
  table: Table<TFeatures, TData>;

  @Input({ required: true })
  label: string;

  @HostBinding('attr.data-size')
  @Input()
  size: KirbyDataGridSize = 'md';

  // Core APIs only for now; switch to the server's rowCount, a page offset and visible columns
  // when pagination and column visibility are added.

  /** Number of header rows; more than one when columns are grouped. */
  get headerRowCount(): number {
    return this.table.getHeaderGroups().length;
  }

  /** All rows in the grid, header rows included. */
  get totalRowCount(): number {
    return this.headerRowCount + this.table.getCoreRowModel().rows.length;
  }

  /** All leaf columns, i.e. the columns that hold cells. */
  get columnCount(): number {
    return this.table.getAllLeafColumns().length;
  }

  /** 1-based `aria-rowindex` of a body row, counting header rows first. */
  getRowIndex(rowId: string): number {
    const position = this.table.getRowModel().rows.findIndex((row) => row.id === rowId);
    return this.headerRowCount + position + 1;
  }

  /** 1-based `aria-colindex` of a leaf column. */
  getColumnIndex(columnId: string): number {
    return this.table.getAllLeafColumns().findIndex((column) => column.id === columnId) + 1;
  }
}
