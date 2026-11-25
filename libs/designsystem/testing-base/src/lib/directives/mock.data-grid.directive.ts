import { Directive, forwardRef, Input } from '@angular/core';
import { Cell, HeaderGroup, Row, RowData, TableFeatures } from '@tanstack/angular-table';

import {
  DataGridCellDirective,
  DataGridHeaderRowDirective,
  DataGridRowDirective,
  DataGridTableDirective,
} from '@kirbydesign/designsystem/data-grid';

// The real building blocks read from the kirby-data-grid container, which is mocked in tests.

@Directive({
  selector: 'table[kirbyDataGridTable]',
  providers: [
    {
      provide: DataGridTableDirective,
      useExisting: forwardRef(() => MockDataGridTableDirective),
    },
  ],
})
export class MockDataGridTableDirective {}

@Directive({
  selector: 'tr[kirbyDataGridHeaderRow]',
  providers: [
    {
      provide: DataGridHeaderRowDirective,
      useExisting: forwardRef(() => MockDataGridHeaderRowDirective),
    },
  ],
})
export class MockDataGridHeaderRowDirective<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  @Input('kirbyDataGridHeaderRow') headerGroup: HeaderGroup<TFeatures, TData>;
}

@Directive({
  selector: 'tr[kirbyDataGridRow]',
  providers: [
    {
      provide: DataGridRowDirective,
      useExisting: forwardRef(() => MockDataGridRowDirective),
    },
  ],
})
export class MockDataGridRowDirective<TFeatures extends TableFeatures, TData extends RowData> {
  @Input('kirbyDataGridRow') row: Row<TFeatures, TData>;
}

@Directive({
  selector: 'td[kirbyDataGridCell]',
  providers: [
    {
      provide: DataGridCellDirective,
      useExisting: forwardRef(() => MockDataGridCellDirective),
    },
  ],
})
export class MockDataGridCellDirective<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue,
> {
  @Input('kirbyDataGridCell') cell: Cell<TFeatures, TData, TValue>;
}
