import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { DataGridDefaultExampleComponent } from '../../examples/data-grid-example/examples/default';
import { DataGridCustomContentExampleComponent } from '../../examples/data-grid-example/examples/custom-content';
import { DataGridSelectionExampleComponent } from '../../examples/data-grid-example/examples/selection';
import { DataGridComposableExampleComponent } from '../../examples/data-grid-example/examples/composable';
import { DataGridOrderReconciliationExampleComponent } from '../../examples/data-grid-example/examples/order-reconciliation';

@Component({
  selector: 'cookbook-data-grid-showcase',
  templateUrl: './data-grid-showcase.component.html',
  styleUrls: ['./data-grid-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    DataGridDefaultExampleComponent,
    DataGridCustomContentExampleComponent,
    DataGridSelectionExampleComponent,
    DataGridComposableExampleComponent,
    DataGridOrderReconciliationExampleComponent,
  ],
})
export class DataGridShowcaseComponent {}
