import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ChartExampleComponent } from './chart-example.component';
import { ChartExampleBarComponent } from './examples/chart-example-bar.component';

const COMPONENT_DECLARATIONS = [ChartExampleComponent, ChartExampleBarComponent];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class Chart2ExampleModule {}
