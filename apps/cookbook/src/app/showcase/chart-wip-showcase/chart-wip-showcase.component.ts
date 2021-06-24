import { Component } from '@angular/core';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-chart-wip-showcase',
  templateUrl: './chart-wip-showcase.component.html',
  styleUrls: ['./chart-wip-showcase.component.scss'],
})
export class ChartWipShowcaseComponent {
  _cardMode = 'flat';
  _cardHasPadding = true;
  _apiDescriptionProperties: ApiDescriptionProperty[] = [
    {
      name: 'type',
      description: 'Controls the type which the chart should be displayed as.',
      type: ['ChartType', '"column"', '"bar"'],
      defaultValue: 'ChartType.column',
    },
    {
      name: 'data',
      description:
        'The data which the chart should display. Can be supplied as a simple array of numbers or as a chart.js dataset. See: https://www.chartjs.org/docs/latest/general/data-structures.html ',
      type: ['number[]', 'ChartDataset[]'],
    },
    {
      name: 'dataLabels',
      description: `(Optional) Labels that should be displayed along the main axis for each category.`,
      type: ['string[]'],
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
