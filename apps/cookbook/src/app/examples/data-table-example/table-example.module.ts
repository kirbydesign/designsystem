import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from '@kirbydesign/designsystem/card';
import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';

import { DataTableCardExampleComponent } from './examples/card';
import { DataTableDefaultExampleComponent } from './examples/default';
import { DataTableSortableExampleComponent } from './examples/sortable';

const COMPONENT_DECLARATIONS = [
  DataTableCardExampleComponent,
  DataTableDefaultExampleComponent,
  DataTableSortableExampleComponent,
];

@NgModule({
  imports: [CommonModule, CardModule, TableSortableComponent],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DataTableExampleModule {}
