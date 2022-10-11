import { Component } from '@angular/core';
import { dataTableApi, dataTableCssCustomProperties } from './data-table-api';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-data-table-showcase',
  templateUrl: './data-table-showcase.component.html',
  styleUrls: ['./data-table-showcase.component.scss'],
})
export class DataTableShowcaseComponent {
  _apiDescriptionProperties: ApiDescriptionProperty[] = [...dataTableApi];
  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = dataTableCssCustomProperties.columns;
  _cssCustomProperties: ApiDescriptionProperty[] = dataTableCssCustomProperties.apiDescription;
}
