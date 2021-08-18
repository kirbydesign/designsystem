import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { IphoneModule } from '../iphone/iphone.module';

import { LayoutRecipesComponent } from './layout-recipes.component';

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
  declarations: [LayoutRecipesComponent],
  exports: [LayoutRecipesComponent],
})
export class LayoutRecipesModule {}
