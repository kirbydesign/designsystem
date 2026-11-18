import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RowData, Table, TableFeatures } from '@tanstack/angular-table';

export type KirbyDataGridSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'kirby-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent<TFeatures extends TableFeatures, TData extends RowData> {
  @Input({ required: true })
  table: Table<TFeatures, TData>;

  @Input({ required: true })
  label: string;

  @HostBinding('attr.data-size')
  @Input()
  size: KirbyDataGridSize = 'md';
}
