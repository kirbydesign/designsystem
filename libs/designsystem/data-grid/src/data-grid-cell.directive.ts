import { Directive, HostBinding, inject, Input } from '@angular/core';
import { Cell, RowData, TableFeatures } from '@tanstack/angular-table';

import { DataGridComponent } from './data-grid.component';

@Directive({
  selector: 'td[kirbyDataGridCell]',
})
export class DataGridCellDirective<TFeatures extends TableFeatures, TData extends RowData, TValue> {
  private readonly dataGrid = inject(DataGridComponent);

  @Input({ required: true, alias: 'kirbyDataGridCell' })
  cell: Cell<TFeatures, TData, TValue>;

  @HostBinding('attr.aria-colindex')
  get colIndex(): number {
    return this.dataGrid.getColumnIndex(this.cell.column.id);
  }
}
