import { Directive, HostBinding, Input } from '@angular/core';
import { HeaderGroup, RowData, TableFeatures } from '@tanstack/angular-table';

@Directive({
  selector: 'tr[kirbyDataGridHeaderRow]',
})
export class DataGridHeaderRowDirective<TFeatures extends TableFeatures, TData extends RowData> {
  @Input({ required: true, alias: 'kirbyDataGridHeaderRow' })
  headerGroup: HeaderGroup<TFeatures, TData>;

  @HostBinding('attr.aria-rowindex')
  get rowIndex(): number {
    return this.headerGroup.depth + 1;
  }
}
