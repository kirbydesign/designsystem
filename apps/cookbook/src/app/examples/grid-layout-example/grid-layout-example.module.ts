import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { GridLayoutCoreExampleComponent } from './grid-layout-core-example/grid-layout-core-example.component';
import { GridLayoutExtendedExampleComponent } from './grid-layout-extended-example/grid-layout-extended-example.component';

const gridLayoutExamples = [GridLayoutCoreExampleComponent, GridLayoutExtendedExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...gridLayoutExamples],
  exports: [...gridLayoutExamples],
})
export class GridLayoutExamplesModule {}
