import { Component } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ChartExampleSimpleColumnComponent } from './examples/chart-example-simple-column-chart.component';
import { ChartExampleBarComponent } from './examples/chart-example-bar.component';
import { ChartExampleColumnComponent } from './examples/chart-example-column-chart.component';
import { ChartExampleLineComponent } from './examples/chart-example-line.component';
import { ChartExampleAreaLineComponent } from './examples/chart-example-area-line.component';
import { ChartExampleColumnStackedComponent } from './examples/chart-example-column-stacked.component';
import { ChartExampleMultipleDatasetsComponent } from './examples/chart-example-multiple-datasets.component';
import { ChartExampleAccessibilityComponent } from './examples/chart-example-accessibility.component';
import { ChartExampleInteractionComponent } from './examples/chart-example-interaction.component';
import { ChartExampleAnnotationsComponent } from './examples/chart-example-annotations.component';

@Component({
  selector: 'cookbook-charts-example',
  templateUrl: './charts-example.component.html',
  styleUrls: ['./charts-example.component.scss'],
  imports: [
    CardComponent,
    ChartExampleSimpleColumnComponent,
    ChartExampleBarComponent,
    ChartExampleColumnComponent,
    ChartExampleLineComponent,
    ChartExampleAreaLineComponent,
    ChartExampleColumnStackedComponent,
    ChartExampleMultipleDatasetsComponent,
    ChartExampleAccessibilityComponent,
    ChartExampleInteractionComponent,
    ChartExampleAnnotationsComponent,
  ],
})
export class ChartsExampleComponent {}
