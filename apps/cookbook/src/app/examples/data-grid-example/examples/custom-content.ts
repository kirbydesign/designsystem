import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import {
  type CellContext,
  type ColumnDef,
  createSortedRowModel,
  DataGridComponent,
  flexRenderComponent,
  injectFlexRenderContext,
  stockFeatures,
  type TableFeatures,
  tableFeatures,
} from '@kirbydesign/designsystem/data-grid';

import { Customer, customers } from '../example-data';

const statusThemes: Record<Customer['status'], 'success' | 'warning' | 'danger'> = {
  active: 'success',
  inactive: 'warning',
  blocked: 'danger',
};

@Component({
  selector: 'cookbook-data-grid-status-badge-cell',
  template: `
    <kirby-badge [themeColor]="themeColor">{{ cell.getValue() }}</kirby-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
})
class CustomerStatusBadgeCellComponent {
  readonly cell =
    injectFlexRenderContext<CellContext<TableFeatures, Customer, Customer['status']>>();

  get themeColor() {
    return statusThemes[this.cell.getValue()];
  }
}

const columns: ColumnDef<TableFeatures, Customer>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(CustomerStatusBadgeCellComponent),
  },
];

const config = {
  selector: 'cookbook-data-grid-custom-content-example',
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
export class DataGridCustomContentExampleComponent {
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
  dataSnippet = `import { Component } from '@angular/core';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import {
  type CellContext,
  type ColumnDef,
  createSortedRowModel,
  flexRenderComponent,
  injectFlexRenderContext,
  stockFeatures,
  type TableFeatures,
  tableFeatures,
} from '@kirbydesign/designsystem/data-grid';
import { Customer, customers } from '../example-data';

const statusThemes: Record<Customer['status'], 'success' | 'warning' | 'danger'> = {
  active: 'success',
  inactive: 'warning',
  blocked: 'danger',
};

@Component({
  template: \`<kirby-badge [themeColor]="themeColor">{{ cell.getValue() }}</kirby-badge>\`,
  imports: [BadgeComponent],
})
class CustomerStatusBadgeCellComponent {
  readonly cell = injectFlexRenderContext<
    CellContext<TableFeatures, Customer, Customer['status']>
  >();

  get themeColor() {
    return statusThemes[this.cell.getValue()];
  }
}

const columns: ColumnDef<TableFeatures, Customer>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(CustomerStatusBadgeCellComponent),
  },
];

const tableOptions = {
  features: tableFeatures({
    ...stockFeatures,
    sortedRowModel: createSortedRowModel(),
  }),
  enableSorting: true,
  initialState: {
    sorting: [{ id: 'name', desc: false }],
  },
};`;
}
