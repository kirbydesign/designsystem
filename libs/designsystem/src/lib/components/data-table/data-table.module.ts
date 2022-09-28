import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDirective } from './table.directive';

@NgModule({
  declarations: [TableDirective],
  imports: [CommonModule],
  exports: [TableDirective],
})
export class DataTableModule {}
