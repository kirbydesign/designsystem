import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from '@kirbydesign/designsystem/card';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ChartExampleSimpleColumnComponent } from '../../examples/charts-example/examples/chart-example-simple-column-chart.component';
import { ChartExampleColumnComponent } from '../../examples/charts-example/examples/chart-example-column-chart.component';
import { ChartExampleBarComponent } from '../../examples/charts-example/examples/chart-example-bar.component';
import { ChartExampleLineComponent } from '../../examples/charts-example/examples/chart-example-line.component';
import { ChartExampleInteractionComponent } from '../../examples/charts-example/examples/chart-example-interaction.component';
import { ChartExampleColumnStackedComponent } from '../../examples/charts-example/examples/chart-example-column-stacked.component';
import { ChartExampleMultipleDatasetsComponent } from '../../examples/charts-example/examples/chart-example-multiple-datasets.component';
import { ChartExampleAnnotationsComponent } from '../../examples/charts-example/examples/chart-example-annotations.component';
import { ChartExampleAreaLineComponent } from '../../examples/charts-example/examples/chart-example-area-line.component';
import { ChartExampleAccessibilityComponent } from '../../examples/charts-example/examples/chart-example-accessibility.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { baseChartApi, baseChartCssCustomProperties } from './base-chart-api';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-chart-showcase',
  templateUrl: './chart-showcase.component.html',
  imports: [
    RouterLink,
    CardModule,
    ExampleViewerComponent,
    ChartExampleSimpleColumnComponent,
    DividerComponent,
    ChartExampleColumnComponent,
    ChartExampleBarComponent,
    ChartExampleLineComponent,
    ChartExampleInteractionComponent,
    ChartExampleColumnStackedComponent,
    ChartExampleMultipleDatasetsComponent,
    ChartExampleAnnotationsComponent,
    ChartExampleAreaLineComponent,
    ChartExampleAccessibilityComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class ChartShowcaseComponent {
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
