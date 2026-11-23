import {
  Column,
  Column_RowSorting,
  Row,
  Row_RowSelection,
  RowData,
  Table,
  Table_RowSelection,
  TableFeatures,
} from '@tanstack/angular-table';

// Each TanStack feature adds its methods to columns, rows and the table only when it is
// registered in `features`. These guards check for a feature at runtime and narrow the type.

/** True when the table has rowSortingFeature registered. */
export function hasSorting<TFeatures extends TableFeatures, TData extends RowData, TValue>(
  column: Column<TFeatures, TData, TValue>
): column is Column<TFeatures, TData, TValue> & Column_RowSorting<TFeatures, TData> {
  return 'getCanSort' in column;
}

/** True when the table has rowSelectionFeature registered. */
export function hasRowSelection<TFeatures extends TableFeatures, TData extends RowData>(
  row: Row<TFeatures, TData>
): row is Row<TFeatures, TData> & Row_RowSelection {
  return 'getIsSelected' in row;
}

/** True when the table has rowSelectionFeature registered. */
export function tableHasRowSelection<TFeatures extends TableFeatures, TData extends RowData>(
  table: Table<TFeatures, TData>
): table is Table<TFeatures, TData> & Table_RowSelection<TFeatures, TData> {
  return 'getIsAllRowsSelected' in table;
}
