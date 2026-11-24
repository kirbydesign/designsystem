import { ChangeDetectionStrategy, Component, HostListener, inject, Input } from '@angular/core';
import {
  CellContext,
  ColumnDef,
  flexRenderComponent,
  HeaderContext,
  injectFlexRenderContext,
  RowData,
  TableFeatures,
} from '@tanstack/angular-table';
import type {
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
} from '@tanstack/angular-table';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { TranslationService } from '@kirbydesign/designsystem/shared';

// The features the selection column's own options refer to; options for features a table
// doesn't register are ignored by TanStack. Type-only, so none of them end up in the bundle.
type SelectionColumnFeatures = {
  rowSelectionFeature: typeof rowSelectionFeature;
  rowSortingFeature: typeof rowSortingFeature;
  columnVisibilityFeature: typeof columnVisibilityFeature;
};

type SelectionFeatures = TableFeatures & { rowSelectionFeature: typeof rowSelectionFeature };

// The host covers the whole selection cell, so a click anywhere in the cell can toggle the
// checkbox. kirby-checkbox's invisible label is positioned over the box and still catches
// clicks; in this narrow cell its text wraps, so it is clipped to the cell.
const hostStyles = `
  :host {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
`;

// A click on the checkbox itself is handled by kirby-checkbox.
const isOnCheckbox = (event: MouseEvent) => !!(event.target as Element).closest('kirby-checkbox');

export interface KirbyDataGridSelectionColumnOptions<TData extends RowData> {
  /** Names the row in its checkbox's accessible name, for example "Select Acme A/S". */
  rowLabel: (row: TData) => string;
}

@Component({
  selector: 'kirby-data-grid-select-all-checkbox',
  host: { class: 'kirby-data-grid-selection-checkbox' },
  styles: hostStyles,
  template: `
    <kirby-checkbox
      size="xs"
      [attr.aria-label]="label"
      [checked]="table.getIsAllRowsSelected()"
      [indeterminate]="table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()"
      [disabled]="table.getRowModel().rows.length === 0"
      (checkedChange)="table.toggleAllRowsSelected($event)"
    ></kirby-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent],
})
class DataGridSelectAllCheckboxComponent {
  private readonly context = injectFlexRenderContext<HeaderContext<SelectionFeatures, RowData>>();
  readonly table = this.context.table;
  readonly label = inject(TranslationService).get('selectAllRows');

  @HostListener('click', ['$event'])
  onCellClick(event: MouseEvent): void {
    if (isOnCheckbox(event) || this.table.getRowModel().rows.length === 0) return;
    this.table.toggleAllRowsSelected(!this.table.getIsAllRowsSelected());
  }
}

@Component({
  selector: 'kirby-data-grid-row-checkbox',
  host: { class: 'kirby-data-grid-selection-checkbox' },
  styles: hostStyles,
  template: `
    <kirby-checkbox
      size="xs"
      [attr.aria-label]="accessibleName"
      [checked]="row.getIsSelected()"
      [disabled]="!row.getCanSelect()"
      (checkedChange)="row.toggleSelected($event)"
    ></kirby-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent],
})
class DataGridRowCheckboxComponent {
  private readonly translations = inject(TranslationService);
  private readonly context = injectFlexRenderContext<CellContext<SelectionFeatures, RowData>>();
  readonly row = this.context.row;

  @Input({ required: true }) label: string;

  @HostListener('click', ['$event'])
  onCellClick(event: MouseEvent): void {
    if (isOnCheckbox(event) || !this.row.getCanSelect()) return;
    this.row.toggleSelected(!this.row.getIsSelected());
  }

  get accessibleName(): string {
    // A replacer function, so `$&` and similar patterns in the label are kept as text.
    return this.translations.get('selectRow').replace('{label}', () => this.label);
  }
}

/**
 * A column with Kirby's selection checkboxes: select all in the header, one per row.
 * Which rows can be selected is decided by the table options, for example `enableRowSelection`.
 */
export function kirbyDataGridSelectionColumn<
  TFeatures extends SelectionFeatures,
  TData extends RowData,
>(options: KirbyDataGridSelectionColumnOptions<TData>): ColumnDef<TFeatures, TData> {
  const column: ColumnDef<SelectionColumnFeatures, TData> = {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: () => flexRenderComponent(DataGridSelectAllCheckboxComponent),
    cell: ({ row }) =>
      flexRenderComponent(DataGridRowCheckboxComponent, {
        inputs: { label: options.rowLabel(row.original) },
      }),
  };
  // TypeScript can't relate a concrete column to a generic feature set, so the definition is
  // checked against SelectionColumnFeatures above and handed over as the consumer's type.
  return column as unknown as ColumnDef<TFeatures, TData>;
}
