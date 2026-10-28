import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  type CellContext,
  FlexRender,
  type RowData,
  type TableFeatures,
} from '@tanstack/angular-table';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'td[kirby-data-grid-cell]',
  templateUrl: './data-grid-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlexRender],
})
export class DataGridCellComponent {
  readonly cellContext = input.required<CellContext<TableFeatures, RowData, unknown>>();
}
