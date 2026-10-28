import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import {
  type CellContext,
  type ColumnDef,
  createSortedRowModel,
  DataGridComponent,
  flexRenderComponent,
  type HeaderContext,
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
  selector: 'cookbook-data-grid-selection-checkbox-cell',
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
class CustomerSelectionCheckboxCellComponent {
  readonly cell = injectFlexRenderContext<CellContext<TableFeatures, Customer, unknown>>();
}

@Component({
  selector: 'cookbook-data-grid-selection-checkbox-header',
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
class CustomerSelectionCheckboxHeaderComponent {
  readonly header = injectFlexRenderContext<HeaderContext<TableFeatures, Customer, unknown>>();
}

@Component({
  selector: 'cookbook-data-grid-selection-status-cell',
  template: `
    <kirby-badge [themeColor]="themeColor">{{ cell.getValue() }}</kirby-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent],
})
class CustomerSelectionStatusCellComponent {
  readonly cell =
    injectFlexRenderContext<CellContext<TableFeatures, Customer, Customer['status']>>();

  get themeColor() {
    return statusThemes[this.cell.getValue()];
  }
}

const columns: ColumnDef<TableFeatures, Customer>[] = [
  {
    id: 'selection',
    header: () => flexRenderComponent(CustomerSelectionCheckboxHeaderComponent),
    cell: () => flexRenderComponent(CustomerSelectionCheckboxCellComponent),
    enableSorting: false,
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(CustomerSelectionStatusCellComponent),
  },
];

const config = {
  selector: 'cookbook-data-grid-selection-example',
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
export class DataGridSelectionExampleComponent {
  readonly customers = customers;
  readonly columns = columns;
  readonly tableOptions = {
    features: tableFeatures({
      ...stockFeatures,
      sortedRowModel: createSortedRowModel(),
    }),
    enableSorting: true,
    enableRowSelection: true,
    initialState: {
      sorting: [{ id: 'name', desc: false }],
    },
  };

  template: string = config.template;
  dataSnippet = `import { Component } from '@angular/core';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import {
  type CellContext,
  type ColumnDef,
  createSortedRowModel,
  flexRenderComponent,
  type HeaderContext,
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
  template: \`<kirby-checkbox
    size="xs"
    [checked]="cell.row.getIsSelected()"
    [disabled]="!cell.row.getCanSelect()"
    [attr.aria-label]="'Select ' + cell.row.original.name"
    (checkedChange)="cell.row.toggleSelected($event)"
  ></kirby-checkbox>\`,
  imports: [CheckboxComponent],
})
class CustomerSelectionCheckboxCellComponent {
  readonly cell = injectFlexRenderContext<CellContext<TableFeatures, Customer, unknown>>();
}

@Component({
  template: \`<kirby-checkbox
    size="xs"
    [checked]="header.table.getIsAllRowsSelected()"
    [indeterminate]="
      header.table.getIsSomeRowsSelected() && !header.table.getIsAllRowsSelected()
    "
    aria-label="Select all customers"
    (checkedChange)="header.table.toggleAllRowsSelected($event)"
  ></kirby-checkbox>\`,
  imports: [CheckboxComponent],
})
class CustomerSelectionCheckboxHeaderComponent {
  readonly header = injectFlexRenderContext<HeaderContext<TableFeatures, Customer, unknown>>();
}

@Component({
  template: \`<kirby-badge [themeColor]="themeColor">{{ cell.getValue() }}</kirby-badge>\`,
  imports: [BadgeComponent],
})
class CustomerSelectionStatusCellComponent {
  readonly cell = injectFlexRenderContext<
    CellContext<TableFeatures, Customer, Customer['status']>
  >();

  get themeColor() {
    return statusThemes[this.cell.getValue()];
  }
}

const columns: ColumnDef<TableFeatures, Customer>[] = [
  {
    id: 'selection',
    header: () => flexRenderComponent(CustomerSelectionCheckboxHeaderComponent),
    cell: () => flexRenderComponent(CustomerSelectionCheckboxCellComponent),
    enableSorting: false,
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableSorting: false },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'balance', header: 'Balance' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => flexRenderComponent(CustomerSelectionStatusCellComponent),
  },
];

tableOptions = {
  features: tableFeatures({
    ...stockFeatures,
    sortedRowModel: createSortedRowModel(),
  }),
  enableSorting: true,
  enableRowSelection: true,
};`;
}
