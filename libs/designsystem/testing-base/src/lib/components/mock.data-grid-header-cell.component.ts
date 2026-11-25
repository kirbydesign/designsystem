import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { Header, RowData, TableFeatures } from '@tanstack/angular-table';

import { DataGridHeaderCellComponent } from '@kirbydesign/designsystem/data-grid';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[kirbyDataGridHeaderCell]',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: DataGridHeaderCellComponent,
      useExisting: forwardRef(() => MockDataGridHeaderCellComponent),
    },
  ],
})
export class MockDataGridHeaderCellComponent<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue,
> {
  @Input('kirbyDataGridHeaderCell') header: Header<TFeatures, TData, TValue>;
}

// #endregion
