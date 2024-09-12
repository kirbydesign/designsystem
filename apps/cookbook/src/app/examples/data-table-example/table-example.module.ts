import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from '@kirbydesign/designsystem/card';
import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';

import { DataTableCardExampleComponent } from './examples/card';
import { DataTableDefaultExampleComponent } from './examples/default';
import { DataTableSortableExampleComponent } from './examples/sortable';
import { DataTableExampleComponent } from './data-table-example.component';

const COMPONENT_DECLARATIONS = [
  DataTableExampleComponent,
  DataTableCardExampleComponent,
  DataTableDefaultExampleComponent,
  DataTableSortableExampleComponent,
];

@NgModule({
  imports: [CommonModule, CardModule, TableSortableComponent],
  providers: [ToastController, ToastHelper],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DataTableExampleModule {}
