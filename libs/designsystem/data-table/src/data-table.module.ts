import { NgModule } from '@angular/core';
import { TableSortableComponent } from './sortable/sortable.component';

/**
 * @deprecated 'DataTableModule' has been deprecated in favor of the standalone 'TableSortableComponent'.
 * Please import 'TableSortableComponent' instead. 'DataTableModule' will be removed in Kirby v11.
 */
@NgModule({
  imports: [TableSortableComponent],
  exports: [TableSortableComponent],
})
export class DataTableModule {
  constructor() {
    console.warn(`'DataTableModule' has been deprecated in favor of the standalone 'TableSortableComponent'.
Please import 'TableSortableComponent' instead. 'DataTableModule' will be removed in Kirby v11.`);
  }
}
