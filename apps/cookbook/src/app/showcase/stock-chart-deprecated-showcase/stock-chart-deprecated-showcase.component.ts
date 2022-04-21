import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-highstock-chart-deprecated-showcase',
  templateUrl: './stock-chart-deprecated-showcase.component.html',
})
export class StockChartDeprecatedShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'description',
      description: 'Description of Highstock Chart for accessibility',
      type: ['string - e.g. "Microsoft Stock (NASDAQ: MSFT) today"'],
    },
    {
      name: 'options',
      description: 'Options input for Highstock Chart',
      type: ['Options'],
    },
    {
      name: 'data',
      description: 'Data input for Highstock Chart',
      type: ['StockChartDataPoint[]'],
    },
    {
      name: 'height',
      description: 'The height of the Highstock Chart in px for web and dp for native',
      type: ['number'],
    },
  ];
}
