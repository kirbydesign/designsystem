import { Directive, HostBinding, inject, Input } from '@angular/core';
import { Row, RowData, TableFeatures } from '@tanstack/angular-table';

import { DataGridComponent } from './data-grid.component';
import { hasRowSelection } from './data-grid-features';

@Directive({
  selector: 'tr[kirbyDataGridRow]',
})
export class DataGridRowDirective<TFeatures extends TableFeatures, TData extends RowData> {
  private readonly dataGrid = inject(DataGridComponent);

  @Input({ required: true, alias: 'kirbyDataGridRow' })
  row: Row<TFeatures, TData>;

  @HostBinding('attr.aria-rowindex')
  get rowIndex(): number {
    return this.dataGrid.getRowIndex(this.row.id);
  }

  // Only selectable rows get aria-selected, so assistive technology can tell them apart.
  @HostBinding('attr.aria-selected')
  get ariaSelected(): boolean | null {
    const row = this.row;
    if (!hasRowSelection(row) || !row.getCanSelect()) return null;
    return row.getIsSelected();
  }

  @HostBinding('class.selected')
  get isSelected(): boolean {
    const row = this.row;
    if (!hasRowSelection(row)) return false;
    return row.getIsSelected();
  }
}
