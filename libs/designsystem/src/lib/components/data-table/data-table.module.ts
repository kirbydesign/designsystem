import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRowComponent } from './tr/tr.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [TableComponent, TableRowComponent],
  imports: [CommonModule],
  exports: [TableComponent, TableRowComponent],
})
export class DataTableModule {}
