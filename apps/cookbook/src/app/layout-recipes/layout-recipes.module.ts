import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { IphoneModule } from '../iphone/iphone.module';

import { LayoutRecipesComponent } from './layout-recipes.component';
import { GridLayoutCoreExampleComponent } from './recipes/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component';
import { GridLayoutExtendedExampleComponent } from './recipes/grid-layout-example/grid-layout-extended-example/grid-layout-extended-example.component';

const RECIPES = [GridLayoutCoreExampleComponent, GridLayoutExtendedExampleComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutRecipesComponent,
      },
    ]),
    KirbyModule,
    IphoneModule,
  ],
  declarations: [LayoutRecipesComponent, ...RECIPES],
  exports: [LayoutRecipesComponent, ...RECIPES],
})
export class LayoutRecipesModule {}
