import { Directive, HostBinding, inject, Input } from '@angular/core';
import { Header, RowData, TableFeatures } from '@tanstack/angular-table';

import { DataGridComponent } from './data-grid.component';

@Directive({
  selector: 'th[kirbyDataGridHeaderCell]',
})
export class DataGridHeaderCellDirective<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue,
> {
  private readonly dataGrid = inject(DataGridComponent);

  @Input({ required: true, alias: 'kirbyDataGridHeaderCell' })
  header: Header<TFeatures, TData, TValue>;

  // A grouped header starts at its leftmost leaf column.
  @HostBinding('attr.aria-colindex')
  get colIndex(): number {
    const firstLeaf = this.header.getLeafHeaders()[0];
    return this.dataGrid.getColumnIndex(firstLeaf.column.id);
  }

  // Native colspan, which also gives assistive technology the span.
  @HostBinding('attr.colspan')
  get colSpan(): number | null {
    return this.header.colSpan > 1 ? this.header.colSpan : null;
  }
}
