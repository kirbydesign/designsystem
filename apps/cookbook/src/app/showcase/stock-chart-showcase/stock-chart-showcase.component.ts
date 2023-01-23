import { Component } from '@angular/core';
import { baseChartApi, baseChartCssCustomProperties } from '../chart-showcase/base-chart-api';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-stock-chart-showcase',
  templateUrl: './stock-chart-showcase.component.html',
})
export class StockChartShowcaseComponent {
  _cardHasPadding = true;
  _apiDescriptionProperties: ApiDescriptionProperty[] = [
    {
      name: 'data',
      description:
        "The data which the chart should display. \n\n The 'x' value of each datapoint is time as epoch timestamp; 'y' is value at time 'x'.",
      type: ['{data: {x: number, y: number}[]}[]', 'ChartDataset[]'],
    },
    ...baseChartApi,
    {
      name: 'dataLabelOptions',
      description:
        "(Optional) Determines which data labels should be shown. \n\n See below description of 'ChartDataLabelOptions' for more information.",
      type: ['ChartDataLabelOptions'],
    },
  ];

  _chartDataLabelOptions: ApiDescriptionProperty[] = [
    {
      name: 'showMin',
      type: ['boolean'],
      defaultValue: 'false',
      description: 'Should there be a data label that shows the lowest value?',
    },
    {
      name: 'showMax',
      type: ['boolean'],
      defaultValue: 'false',
      description: 'Should there be a data label that shows the highest value?',
    },
    {
      name: 'showCurrent',
      type: ['boolean'],
      defaultValue: 'false',
      description: 'Should there be a data label that shows the current value?',
    },
    {
      name: 'locale',
      type: ['ChartLocale'],
      defaultValue: 'en-US',
      description: 'How should time and numeric fragments be displayed?',
    },
    {
      name: 'valueSuffix',
      type: ['string'],
      defaultValue: '',
      description: 'Add a suffix for the value on datalabels, tooltips and the Y-axis',
    },
  ];

  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = baseChartCssCustomProperties.columns;
  _cssCustomProperties: ApiDescriptionProperty[] = baseChartCssCustomProperties.apiDescription;
}
