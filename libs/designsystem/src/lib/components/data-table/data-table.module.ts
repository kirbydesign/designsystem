import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemModule } from './../item/item.module';
import { TableComponent } from './table/table.component';
import { TableHeadComponent } from './thead/thead.component';
import { TableBodyComponent } from './tbody/tbody.component';
import { TableFootComponent } from './tfoot/tfoot.component';
import { TableRowComponent } from './tr/tr.component';

@NgModule({
  declarations: [
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableFootComponent,
    TableRowComponent,
  ],
  imports: [CommonModule, ItemModule],
  exports: [
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableFootComponent,
    TableRowComponent,
  ],
})
export class DataTableModule {}
