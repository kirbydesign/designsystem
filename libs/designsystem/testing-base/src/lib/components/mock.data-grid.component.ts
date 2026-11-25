import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { RowData, Table, TableFeatures } from '@tanstack/angular-table';

import { DataGridComponent, KirbyDataGridSize } from '@kirbydesign/designsystem/data-grid';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-data-grid',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: DataGridComponent,
      useExisting: forwardRef(() => MockDataGridComponent),
    },
  ],
})
export class MockDataGridComponent<TFeatures extends TableFeatures, TData extends RowData> {
  @Input() table: Table<TFeatures, TData>;
  @Input() label: string;
  @Input() size: KirbyDataGridSize;
}

// #endregion
