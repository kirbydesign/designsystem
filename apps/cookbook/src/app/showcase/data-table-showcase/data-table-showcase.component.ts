import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { DataTableDefaultExampleComponent } from '../../examples/data-table-example/examples/default';
import { DataTableCardExampleComponent } from '../../examples/data-table-example/examples/card';
import { DataTableSortableExampleComponent } from '../../examples/data-table-example/examples/sortable';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { dataTableApi } from './data-table-api';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-data-table-showcase',
  templateUrl: './data-table-showcase.component.html',
  styleUrls: ['./data-table-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    DataTableDefaultExampleComponent,
    DataTableCardExampleComponent,
    DataTableSortableExampleComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class DataTableShowcaseComponent {
  _apiDescriptionPropertiesTable: ApiDescriptionProperty[] = [...dataTableApi];
}
