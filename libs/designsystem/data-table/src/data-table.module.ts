import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { TableRowComponent } from './table-row/table-row.component';
import { TableComponent } from './table/table.component';
import { TableSortableComponent } from './sortable/sortable.component';

@NgModule({
  declarations: [TableComponent, TableRowComponent, TableSortableComponent],
  imports: [CommonModule, IconModule],
  exports: [TableComponent, TableRowComponent, TableSortableComponent],
})
export class DataTableModule {}
