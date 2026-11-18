import { Directive, HostBinding, inject } from '@angular/core';

import { DataGridComponent } from './data-grid.component';

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

  // Core APIs only for now; switch to rowCount and visible columns when those features are added.
  @HostBinding('attr.aria-rowcount')
  get rowCount(): number {
    const table = this.dataGrid.table;
    return table.getHeaderGroups().length + table.getCoreRowModel().rows.length;
  }

  @HostBinding('attr.aria-colcount')
  get colCount(): number {
    return this.dataGrid.table.getAllLeafColumns().length;
  }
}
