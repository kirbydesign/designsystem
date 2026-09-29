import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  type ColumnDef,
  createSortedRowModel,
  DataGridComponent,
  stockFeatures,
  type TableFeatures,
  tableFeatures,
} from '@kirbydesign/designsystem/data-grid';

import { Customer, customers } from '../example-data';

const columns: ColumnDef<TableFeatures, Customer>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  { accessorKey: 'status', header: 'Status' },
];

const config = {
  selector: 'cookbook-data-grid-default-example',
  template: `<kirby-data-grid
  [data]="customers"
  [columns]="columns"
  [tableOptions]="tableOptions"
></kirby-data-grid>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataGridComponent],
})
export class DataGridDefaultExampleComponent {
  readonly customers = customers;
  readonly columns = columns;
  readonly tableOptions = {
    features: tableFeatures({
      ...stockFeatures,
      sortedRowModel: createSortedRowModel(),
    }),
    enableSorting: true,
    initialState: {
      sorting: [{ id: 'name', desc: false }],
    },
  };

  template: string = config.template;
  dataSnippet = `customers = customers;

columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  { accessorKey: 'status', header: 'Status' },
];

tableOptions = {
  features: tableFeatures({
    ...stockFeatures,
    sortedRowModel: createSortedRowModel(),
  }),
  initialState: {
    sorting: [{ id: 'name', desc: false }],
  },
};`;
}
