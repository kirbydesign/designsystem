import { Component } from '@angular/core';
import { DataTableDefaultExampleComponent } from './examples/default';
import { DataTableCardExampleComponent } from './examples/card';
import { DataTableSortableExampleComponent } from './examples/sortable';

@Component({
  selector: 'cookbook-data-table-example',
  templateUrl: './data-table-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    DataTableDefaultExampleComponent,
    DataTableCardExampleComponent,
    DataTableSortableExampleComponent,
  ],
})
export class DataTableExampleComponent {}
