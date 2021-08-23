import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { GridLayoutExtendedExampleComponent } from './grid-layout-extended-example/grid-layout-extended-example.component';
import { GridLayoutMultipleContainersExampleComponent } from './grid-layout-multiple-containers-example/grid-layout-multiple-containers-example.component';
import { GridLayoutSingleContainerExampleComponent } from './grid-layout-single-container-example/grid-layout-single-container-example.component';

const gridLayoutExamples = [
  GridLayoutMultipleContainersExampleComponent,
  GridLayoutSingleContainerExampleComponent,
  GridLayoutExtendedExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [...gridLayoutExamples],
  exports: [...gridLayoutExamples],
})
export class GridLayoutExamplesModule {}
