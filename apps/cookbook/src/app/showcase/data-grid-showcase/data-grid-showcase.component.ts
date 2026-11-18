import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { DataGridDefaultExampleComponent } from '../../examples/data-grid-example/examples/default';
import { DataGridSortingExampleComponent } from '../../examples/data-grid-example/examples/sorting';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';

@Component({
  selector: 'cookbook-data-grid-showcase',
  templateUrl: './data-grid-showcase.component.html',
  styleUrls: ['./data-grid-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    ImportViewerComponent,
    DataGridDefaultExampleComponent,
    DataGridSortingExampleComponent,
  ],
})
export class DataGridShowcaseComponent {}
