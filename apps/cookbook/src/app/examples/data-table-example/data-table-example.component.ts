import { Component } from '@angular/core';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
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
  providers: [ToastHelper, ToastController],
})
export class DataTableExampleComponent {}
