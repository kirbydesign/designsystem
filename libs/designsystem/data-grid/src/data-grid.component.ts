import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import {
  type ColumnDef,
  createCoreRowModel,
  FlexRender,
  injectTable,
  type RowData,
  stockFeatures,
  type TableFeatures,
  tableFeatures,
  type TableOptions,
} from '@tanstack/angular-table';

// POC: uses the Kirby table look-and-feel while owning grid rendering and TanStack interaction.
@Component({
  selector: 'kirby-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, IconComponent, FlexRender],
})
export class DataGridComponent {
  data = input.required<RowData[]>();
  columns = input.required<ColumnDef<TableFeatures, RowData>[]>();
  tableOptions = input<Partial<TableOptions<TableFeatures, RowData>>>({});

  table = injectTable(() => {
    const tableOptions = this.tableOptions();

    return {
      ...tableOptions,
      features: tableFeatures({
        ...stockFeatures,
        coreRowModel: createCoreRowModel(),
        ...tableOptions.features,
      }),
      data: this.data(),
      columns: this.columns(),
    };
  });
}
