import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-chart-showcase',
  templateUrl: './chart-showcase.component.html',
  styleUrls: ['./chart-showcase.component.scss'],
})
export class ChartShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'height',
      description: 'The height of the chart in px for web and dp for native',
      type: ['number'],
    },
    {
      name: 'type',
      description: 'The type of chart',
      type: ['donut', 'pie', 'areaspline'],
    },
    {
      name: 'showDataLabels',
      description: 'Enable or disable labels around pie/donut charts',
      type: ['true', 'false'],
      defaultValue: 'true',
    },
    {
      name: 'description',
      description: 'Description of chart for accessibility',
      type: ['string - e.g. "Distribution of assets in custody account"'],
    },
    {
      name: 'data',
      description: 'Data input for chart',
      type: ['See examples above for exact format'],
    },
    {
      name: 'options',
      description:
        'The Highcharts options to configure the chart with (will override existing options using a deep merge)',
      type: ['See [Highcharts options docs](https://api.highcharts.com/highcharts/)'],
    },
  ];
}
