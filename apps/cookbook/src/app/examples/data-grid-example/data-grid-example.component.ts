import { Component } from '@angular/core';
import { DataGridDefaultExampleComponent } from './examples/default';
import { DataGridSortingExampleComponent } from './examples/sorting';
import { DataGridSelectionExampleComponent } from './examples/selection';

@Component({
  selector: 'cookbook-data-grid-example',
  templateUrl: './data-grid-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    DataGridDefaultExampleComponent,
    DataGridSortingExampleComponent,
    DataGridSelectionExampleComponent,
  ],
})
export class DataGridExampleComponent {}
