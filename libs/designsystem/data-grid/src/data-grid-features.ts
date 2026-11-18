import { Column, Column_RowSorting, RowData, TableFeatures } from '@tanstack/angular-table';

// Each TanStack feature adds its methods to columns, rows and the table only when it is
// registered in `features`. These guards check for a feature at runtime and narrow the type.

/** True when the table has rowSortingFeature registered. */
export function hasSorting<TFeatures extends TableFeatures, TData extends RowData, TValue>(
  column: Column<TFeatures, TData, TValue>
): column is Column<TFeatures, TData, TValue> & Column_RowSorting<TFeatures, TData> {
  return 'getCanSort' in column;
}
