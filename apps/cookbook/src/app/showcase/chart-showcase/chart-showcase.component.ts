import { Component } from '@angular/core';
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
      inputValues: ['number'],
    },
    {
      name: 'type',
      description: 'The type of chart',
      inputValues: ['donut', 'pie', 'areaspline'],
    },
    {
      name: 'showDataLabels',
      description: 'Enable or disable labels around pie/donut charts',
      inputValues: ['true', 'false'],
      defaultValue: 'true',
    },
    {
      name: 'description',
      description: 'Description of chart for accessibility',
      inputValues: ['string - e.g. "Distribution of assets in custody account"'],
    },
    {
      name: 'data',
      description: 'Data input for chart',
      inputValues: ['See examples above for exact format'],
    },
    {
      name: 'options',
      description:
        'The Highcharts options to configure the chart with (will override existing options using a deep merge)',
      inputValues: ['See [Highcharts options docs](https://api.highcharts.com/highcharts/)'],
    },
  ];
}
