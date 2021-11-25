import { Component } from '@angular/core';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-chart-showcase',
  templateUrl: './chart-showcase.component.html',
})
export class ChartShowcaseComponent {
  _cardMode = 'flat';
  _cardHasPadding = true;
  _apiDescriptionProperties: ApiDescriptionProperty[] = [
    {
      name: 'type',
      description: 'Controls the type which the chart should be displayed as.',
      type: ['"column"', '"bar"', '"line"'],
      defaultValue: 'column',
    },
    {
      name: 'data',
      description:
        'The data which the chart should display. Can be supplied as a simple array of numbers or as a chart.js dataset. See: https://www.chartjs.org/docs/latest/general/data-structures.html ',
      type: ['number[]', 'ChartDataset[]'],
    },
    {
      name: 'dataLabels',
      description: `(Optional) Labels that should be displayed along the main axis for each category. Multi-line labels can be created by supplying a string[][] as such: ['one line', ['multi', 'line']].`,
      type: ['string[]', 'string[][]'],
    },
    {
      name: 'height',
      description: `(Optional) can be used to set the height of the chart. Will overwrite the value of setting the height using --kirby-chart-height.`,
      type: ['string', 'number'],
      defaultValue: '300px',
    },
    {
      name: 'customOptions',
      description: `(Optional) Chart.js options that can be used to customize the charts, see: https://www.chartjs.org/docs/latest/general/options.html`,
      type: ['ChartOptions'],
    },
    {
      name: 'annotations',
      description: `(Optional) Chart.js annotations that can be used to add annotations to the chart, see: https://www.chartjs.org/chartjs-plugin-annotation/`,
      type: ['AnnotationOptions[]'],
    },
    {
      name: 'highlightedElements',
      description: `(Optional) can be used to highlight specific data elements in the chart. Provided as an array of [number, number] tuples where the first value is the datasetIndex and the second is the dataIndex.`,
      type: ['[number, number][]'],
    },
  ];

  _chartDataLabelOptions: ApiDescriptionProperty[] = [
    {
      name: 'showMin',
      type: ['boolean'],
      defaultValue: 'false',
      description:
        'Should there be a data label that shows the lowest value?',
    },
    {
      name: 'showMax',
      type: ['boolean'],
      defaultValue: 'false',
      description:
        'Should there be a datalabel for the price over time that shows the higest value?',
    },
    {
      name: 'showCurrent',
      type: ['boolean'],
      defaultValue: 'false',
      description:
        'Should there be a datalabel for the price over time that shows the current value?',
    },
    {
      name: 'locale',
      type: ['string'],
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

  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  _cssCustomProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-chart-height',
      description: 'Height of the chart.',
    },
  ];
}
