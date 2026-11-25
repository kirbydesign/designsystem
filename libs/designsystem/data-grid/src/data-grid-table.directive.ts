import { Directive, HostBinding, inject } from '@angular/core';

import { DataGridComponent } from './data-grid.component';
import { tableHasRowSelection } from './data-grid-features';

@Directive({
  selector: 'table[kirbyDataGridTable]',
})
export class DataGridTableDirective {
  private readonly dataGrid = inject(DataGridComponent);

  @HostBinding('attr.role')
  readonly role = 'grid';

  @HostBinding('attr.aria-label')
  get label(): string {
    return this.dataGrid.label;
  }

  @HostBinding('attr.aria-rowcount')
  get rowCount(): number {
    return this.dataGrid.totalRowCount;
  }

  @HostBinding('attr.aria-colcount')
  get colCount(): number {
    return this.dataGrid.columnCount;
  }

  @HostBinding('attr.aria-multiselectable')
  get multiSelectable(): boolean | null {
    const table = this.dataGrid.table;
    if (!tableHasRowSelection(table)) return null;
    return table.options.enableMultiRowSelection !== false;
  }
}
