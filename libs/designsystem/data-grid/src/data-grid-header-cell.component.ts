import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Header, RowData, SortDirection, TableFeatures } from '@tanstack/angular-table';
import { IconComponent } from '@kirbydesign/designsystem/icon';

import { DataGridComponent } from './data-grid.component';
import { hasSorting } from './data-grid-features';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[kirbyDataGridHeaderCell]',
  templateUrl: './data-grid-header-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, IconComponent],
})
export class DataGridHeaderCellComponent<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue,
> implements AfterViewChecked {
  private readonly dataGrid = inject(DataGridComponent);

  @Input({ required: true, alias: 'kirbyDataGridHeaderCell' })
  header: Header<TFeatures, TData, TValue>;

  @ViewChild('label') label?: ElementRef<HTMLElement>;

  // A grouped header starts at its leftmost leaf column.
  @HostBinding('attr.aria-colindex')
  get colIndex(): number {
    const firstLeaf = this.header.getLeafHeaders()[0];
    return this.dataGrid.getColumnIndex(firstLeaf.column.id);
  }

  // Native colspan, which also gives assistive technology the span.
  @HostBinding('attr.colspan')
  get colSpan(): number | null {
    return this.header.colSpan > 1 ? this.header.colSpan : null;
  }

  // A placeholder header sits above an ungrouped column in a grouped header row. It shares the
  // column with the real header below, which owns the sorting.
  @HostBinding('class.sortable')
  get canSort(): boolean {
    const column = this.header.column;
    if (this.header.isPlaceholder || !hasSorting(column)) return false;
    return column.getCanSort();
  }

  get sortDirection(): SortDirection | false {
    const column = this.header.column;
    if (this.header.isPlaceholder || !hasSorting(column)) return false;
    return column.getIsSorted();
  }

  @HostBinding('class.active')
  get isSorted(): boolean {
    return !!this.sortDirection;
  }

  @HostBinding('attr.aria-sort')
  get ariaSort(): 'ascending' | 'descending' | null {
    if (!this.sortDirection) return null;
    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  onSort(event: MouseEvent): void {
    const column = this.header.column;
    if (hasSorting(column)) {
      column.getToggleSortingHandler()?.(event);
    }
  }

  // Bold text on the active header must not shift the layout; the global table styles
  // reserve the bold width from data-text. The label element appears when sorting turns on.
  ngAfterViewChecked(): void {
    const label = this.label?.nativeElement;
    if (label && !label.hasAttribute('data-text')) {
      label.setAttribute('data-text', label.textContent ?? '');
    }
  }
}
