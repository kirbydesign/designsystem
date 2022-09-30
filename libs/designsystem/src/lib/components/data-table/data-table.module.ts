import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemModule } from './../item/item.module';
import { TableComponent } from './table/table.component';
import { TheadComponent } from './thead/thead.component';
import { TbodyComponent } from './tbody/tbody.component';
import { TfootComponent } from './tfoot/tfoot.component';
import { TrComponent } from './tr/tr.component';

@NgModule({
  declarations: [TableComponent, TheadComponent, TbodyComponent, TfootComponent, TrComponent],
  imports: [CommonModule, ItemModule],
  exports: [TableComponent, TheadComponent, TbodyComponent, TfootComponent, TrComponent],
})
export class DataTableModule {}
