import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

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
      name: 'customOptions',
      description: `(Optional) Chart.js options that can be used to customize the charts, see: https://www.chartjs.org/docs/latest/general/options.html`,
      type: ['ChartOptions'],
    },
  ];
}
