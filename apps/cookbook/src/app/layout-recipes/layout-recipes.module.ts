import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExamplesModule } from '../examples/examples.module';
import { IphoneModule } from '../iphone/iphone.module';
import { CodeViewerModule } from '../shared/code-viewer/code-viewer.module';

import { GridLayoutComponent } from './grid-layout/grid-layout.component';
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
        path: 'grid-layout',
        component: GridLayoutComponent,
      },
    ]),
    KirbyModule,
    IphoneModule,
    CodeViewerModule,
    ExamplesModule,
  ],
  declarations: [LayoutRecipesComponent, GridLayoutComponent],
  exports: [LayoutRecipesComponent, GridLayoutComponent],
})
export class LayoutRecipesModule {}
