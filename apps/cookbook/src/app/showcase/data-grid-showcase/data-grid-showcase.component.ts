import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { DataGridDefaultExampleComponent } from '../../examples/data-grid-example/examples/default';

@Component({
  selector: 'cookbook-data-grid-showcase',
  templateUrl: './data-grid-showcase.component.html',
  styleUrls: ['./data-grid-showcase.component.scss'],
  imports: [ExampleViewerComponent, DataGridDefaultExampleComponent],
})
export class DataGridShowcaseComponent {}
