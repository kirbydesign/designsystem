import { Component } from '@angular/core';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { baseChartApi, baseChartCssCustomProperties } from './base-chart-api';

@Component({
  selector: 'cookbook-chart-showcase',
  templateUrl: './chart-showcase.component.html',
})
export class ChartShowcaseComponent {
  _cardMode = 'flat';
  _cardHasPadding = true;
  _apiDescriptionProperties: ApiDescriptionProperty[] = [
    {
      name: 'data',
      description:
        'The data which the chart should display. Can be supplied as a simple array of numbers or as a chart.js dataset. \n\n See: https://www.chartjs.org/docs/latest/general/data-structures.html ',
      type: ['number[]', 'ChartDataset[]'],
    },
    {
      name: 'type',
      description: 'Controls the type which the chart should be displayed as.',
      type: ['"column"', '"bar"', '"line"'],
      defaultValue: 'column',
    },
    ...baseChartApi,
  ];

  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = baseChartCssCustomProperties.columns;

  _cssCustomProperties: ApiDescriptionProperty[] = baseChartCssCustomProperties.apiDescription;
}
