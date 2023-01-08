import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowComponent } from './table-row/table-row.component';
import { TableComponent } from './table/table.component';
import { TableHeadComponent } from './table-head/table-head.component';

@NgModule({
  declarations: [TableComponent, TableRowComponent, TableHeadComponent],
  imports: [CommonModule],
  exports: [TableComponent, TableRowComponent, TableHeadComponent],
})
export class DataTableModule {}
