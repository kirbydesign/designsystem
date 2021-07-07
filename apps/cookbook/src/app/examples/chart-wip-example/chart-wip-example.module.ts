import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ChartWipExampleComponent } from './chart-wip-example.component';
import { ChartWipExampleAccessibilityComponent } from './examples/chart-wip-example-accessibility.component';
import { ChartWipExampleAnnotationsComponent } from './examples/chart-wip-example-annotations.component';
import { ChartWipExampleBarComponent } from './examples/chart-wip-example-bar.component';
import { ChartWipExampleColumnComponent } from './examples/chart-wip-example-column-chart.component';
import { ChartWipExampleColumnStackedComponent } from './examples/chart-wip-example-column-stacked.component';
import { ChartWipExampleInteractionComponent } from './examples/chart-wip-example-interaction.component';
import { ChartWipExampleMultipleDatasetsComponent } from './examples/chart-wip-example-multiple-datasets.component';
import { ChartWipExampleSimpleColumnComponent } from './examples/chart-wip-example-simple-column-chart.component';

const COMPONENT_DECLARATIONS = [
  ChartWipExampleComponent,
  ChartWipExampleSimpleColumnComponent,
  ChartWipExampleColumnComponent,
  ChartWipExampleBarComponent,
  ChartWipExampleInteractionComponent,
  ChartWipExampleColumnStackedComponent,
  ChartWipExampleMultipleDatasetsComponent,
  ChartWipExampleAccessibilityComponent,
  ChartWipExampleAnnotationsComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class ChartWipExampleModule {}
