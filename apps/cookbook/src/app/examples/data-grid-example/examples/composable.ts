import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import {
  type CellContext,
  type ColumnDef,
  ComposableDataGridComponent,
  createSortedRowModel,
  DataGridCellComponent,
  DataGridHeaderCellComponent,
  DataGridTableDirective,
  flexRenderComponent,
  type HeaderContext,
  injectFlexRenderContext,
  sortFn_text,
  stockFeatures,
  tableFeatures,
  type TableFeatures,
} from '@kirbydesign/designsystem/data-grid-composable';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';

import { Customer, customers } from '../example-data';

const statusThemes: Record<Customer['status'], 'success' | 'warning' | 'danger'> = {
  active: 'success',
  inactive: 'warning',
  blocked: 'danger',
};

@Component({
  selector: 'cookbook-data-grid-composable-selection-checkbox-cell',
  template: `
    <kirby-checkbox
      size="xs"
      [checked]="cell.row.getIsSelected()"
      [disabled]="!cell.row.getCanSelect()"
      [attr.aria-label]="'Select ' + cell.row.original.name"
      (checkedChange)="cell.row.toggleSelected($event)"
    ></kirby-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent],
})
class ComposableCustomerSelectionCellComponent {
  readonly cell = injectFlexRenderContext<CellContext<TableFeatures, Customer, unknown>>();
}

@Component({
  selector: 'cookbook-data-grid-composable-selection-checkbox-header',
  template: `
    <kirby-checkbox
      size="xs"
      [checked]="header.table.getIsAllRowsSelected()"
      [indeterminate]="header.table.getIsSomeRowsSelected() && !header.table.getIsAllRowsSelected()"
      aria-label="Select all customers"
      (checkedChange)="header.table.toggleAllRowsSelected($event)"
    ></kirby-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent],
})
class ComposableCustomerSelectionHeaderComponent {
  readonly header = injectFlexRenderContext<HeaderContext<TableFeatures, Customer, unknown>>();
}

@Component({
  selector: 'cookbook-data-grid-composable-status-cell',
  template: `
    <kirby-badge [themeColor]="themeColor">{{ cell.getValue() }}</kirby-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
})
class ComposableCustomerStatusCellComponent {
  readonly cell =
    injectFlexRenderContext<CellContext<TableFeatures, Customer, Customer['status']>>();

  get themeColor() {
    return statusThemes[this.cell.getValue()];
  }
}

const columns: ColumnDef<TableFeatures, Customer>[] = [
  {
    id: 'selection',
    header: () => flexRenderComponent(ComposableCustomerSelectionHeaderComponent),
    cell: () => flexRenderComponent(ComposableCustomerSelectionCellComponent),
    enableSorting: false,
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(ComposableCustomerStatusCellComponent),
  },
];

const config = {
  selector: 'cookbook-data-grid-composable-example',
  template: `<kirby-card>
  <kirby-data-grid-composable
    #grid="kirbyDataGridComposable"
    [data]="customers"
    [columns]="columns"
    [tableOptions]="tableOptions"
  >
    <table kirbyDataGridTable>
      <thead>
        @for (headerGroup of grid.table.getHeaderGroups(); track headerGroup.id) {
          <tr>
            @for (header of headerGroup.headers; track header.id) {
              <th
                kirby-data-grid-header-cell
                [headerContext]="header.getContext()"
                [attr.data-column-id]="header.column.id"
              ></th>
            }
          </tr>
        }
      </thead>
      <tbody>
        @for (row of grid.table.getRowModel().rows; track row.id) {
          <tr>
            @for (cell of row.getVisibleCells(); track cell.id) {
              <td
                kirby-data-grid-cell
                [cellContext]="cell.getContext()"
                [attr.data-column-id]="cell.column.id"
              ></td>
            }
          </tr>
        }
      </tbody>
    </table>
  </kirby-data-grid-composable>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./composable.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ComposableDataGridComponent,
    DataGridTableDirective,
    DataGridHeaderCellComponent,
    DataGridCellComponent,
  ],
})
export class DataGridComposableExampleComponent {
  readonly customers = customers;
  readonly columns = columns;
  readonly tableOptions = {
    features: tableFeatures({
      ...stockFeatures,
      sortedRowModel: createSortedRowModel(),
      sortFns: { text: sortFn_text },
    }),
    enableSorting: true,
    enableRowSelection: true,
    initialState: {
      sorting: [{ id: 'name', desc: false }],
    },
  };

  template: string = config.template;
  dataSnippet = `import { sortFn_text } from '@kirbydesign/designsystem/data-grid-composable';

const columns: ColumnDef<TableFeatures, Customer>[] = [
  {
    id: 'selection',
    header: () => flexRenderComponent(ComposableCustomerSelectionHeaderComponent),
    cell: () => flexRenderComponent(ComposableCustomerSelectionCellComponent),
    enableSorting: false,
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(ComposableCustomerStatusCellComponent),
  },
];

tableOptions = {
  features: tableFeatures({
    ...stockFeatures,
    sortedRowModel: createSortedRowModel(),
    sortFns: { text: sortFn_text },
  }),
  enableSorting: true,
  enableRowSelection: true,
};`;
}
