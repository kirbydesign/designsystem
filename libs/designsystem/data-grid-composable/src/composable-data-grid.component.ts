import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  type ColumnDef,
  createCoreRowModel,
  injectTable,
  type RowData,
  stockFeatures,
  type TableFeatures,
  tableFeatures,
  type TableOptions,
} from '@tanstack/angular-table';

@Component({
  selector: 'kirby-data-grid-composable',
  template: `
    <div
      class="composable-data-grid-layout"
      [class.composable-data-grid-layout-panel-open]="sidePanelOpen()"
    >
      <div class="composable-data-grid-table-slot">
        <ng-content select="table[kirbyDataGridTable]"></ng-content>
      </div>
      <div
        class="composable-data-grid-side-panel-slot"
        [attr.aria-hidden]="sidePanelOpen() ? null : 'true'"
        [attr.inert]="sidePanelOpen() ? null : ''"
      >
        <ng-content select="[kirbyDataGridSidePanel]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./composable-data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'kirbyDataGridComposable',
  host: { class: 'kirby-data-grid-composable' },
})
export class ComposableDataGridComponent {
  readonly data = input.required<RowData[]>();
  readonly columns = input.required<ColumnDef<TableFeatures, RowData>[]>();
  readonly tableOptions = input<Partial<TableOptions<TableFeatures, RowData>>>({});
  readonly sidePanelOpen = signal(false);
  readonly sidePanelContext = signal<unknown>(null);

  readonly table = injectTable(() => {
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

  openSidePanel(context: unknown = null) {
    this.sidePanelContext.set(context);
    this.sidePanelOpen.set(true);
  }

  closeSidePanel() {
    this.sidePanelOpen.set(false);
    this.sidePanelContext.set(null);
  }
}

@Directive({
  selector: '[kirbyDataGridSidePanelTrigger]',
  standalone: true,
  host: { '(click)': 'openSidePanel()' },
})
export class DataGridSidePanelTriggerDirective {
  readonly context = input<unknown>(null, { alias: 'kirbyDataGridSidePanelTrigger' });
  private readonly grid = inject(ComposableDataGridComponent);

  openSidePanel() {
    this.grid.openSidePanel(this.context());
  }
}
