import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-highstock-chart-showcase',
  templateUrl: './stock-chart-showcase.component.html',
  styleUrls: ['./stock-chart-showcase.component.scss'],
})
export class StockChartShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'description',
      description: 'Description of Highstock Chart for accessibility',
      inputValues: ['string - e.g. "Microsoft Stock (NASDAQ: MSFT) today"'],
    },
    {
      name: 'options',
      description: 'Options input for Highstock Chart',
      inputValues: ['Options'],
    },
    {
      name: 'data',
      description: 'Data input for Highstock Chart',
      inputValues: ['StockChartDataPoint[]'],
    },
    {
      name: 'height',
      description: 'The height of the Highstock Chart in px for web and dp for native',
      inputValues: ['number'],
    },
  ];
}
