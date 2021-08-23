import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExamplesModule } from '../examples/examples.module';
import { IphoneModule } from '../iphone/iphone.module';
import { CodeViewerModule } from '../shared/code-viewer/code-viewer.module';

import { GridLayoutExtendedComponent } from './grid-layout/grid-layout-extended/grid-layout-extended.component';
import { GridLayoutMultipleContainersComponent } from './grid-layout/grid-layout-multiple-containers/grid-layout-multiple-containers.component';
import { GridLayoutSingleContainerComponent } from './grid-layout/grid-layout-single-container/grid-layout-single-container.component';
import { LayoutRecipesComponent } from './layout-recipes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutRecipesComponent,
      },
      {
        path: 'grid-layout-single-container',
        component: GridLayoutSingleContainerComponent,
      },
      {
        path: 'grid-layout-multiple-containers',
        component: GridLayoutMultipleContainersComponent,
      },
      {
        path: 'grid-layout-extended',
        component: GridLayoutExtendedComponent,
      },
    ]),
    KirbyModule,
    IphoneModule,
    CodeViewerModule,
    ExamplesModule,
  ],
  declarations: [
    LayoutRecipesComponent,
    GridLayoutSingleContainerComponent,
    GridLayoutMultipleContainersComponent,
    GridLayoutExtendedComponent,
  ],
  exports: [
    LayoutRecipesComponent,
    GridLayoutSingleContainerComponent,
    GridLayoutMultipleContainersComponent,
    GridLayoutExtendedComponent,
  ],
})
export class LayoutRecipesModule {}
