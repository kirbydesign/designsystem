import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import {
  FlexRender,
  type HeaderContext,
  type RowData,
  type TableFeatures,
} from '@tanstack/angular-table';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[kirby-data-grid-header-cell]',
  templateUrl: './data-grid-header-cell.component.html',
  styleUrls: ['./data-grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FlexRender, IconComponent],
  host: {
    '[class.sortable]': 'isSortable',
    '[class.active]': 'isActive',
    '[attr.aria-sort]': 'ariaSort',
  },
})
export class DataGridHeaderCellComponent {
  readonly headerContext = input.required<HeaderContext<TableFeatures, RowData, unknown>>();

  get isSortable(): boolean {
    return this.headerContext().header.column.getCanSort();
  }

  get isActive(): boolean {
    return !!this.headerContext().header.column.getIsSorted();
  }

  get ariaSort(): 'ascending' | 'descending' | 'none' | null {
    if (!this.isSortable) {
      return null;
    }

    const sorted = this.headerContext().header.column.getIsSorted();
    if (sorted === 'asc') {
      return 'ascending';
    }

    if (sorted === 'desc') {
      return 'descending';
    }

    return 'none';
  }
}
