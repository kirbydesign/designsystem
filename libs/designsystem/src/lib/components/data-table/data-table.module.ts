import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemModule } from './../item/item.module';
import { TableComponent } from './table/table.component';
import { TableTheadComponent } from './thead/thead.component';
import { TableTbodyComponent } from './tbody/tbody.component';
import { TableTfootComponent } from './tfoot/tfoot.component';
import { TableTrComponent } from './tr/tr.component';

@NgModule({
  declarations: [
    TableComponent,
    TableTheadComponent,
    TableTbodyComponent,
    TableTfootComponent,
    TableTrComponent,
  ],
  imports: [CommonModule, ItemModule],
  exports: [
    TableComponent,
    TableTheadComponent,
    TableTbodyComponent,
    TableTfootComponent,
    TableTrComponent,
  ],
})
export class DataTableModule {}
