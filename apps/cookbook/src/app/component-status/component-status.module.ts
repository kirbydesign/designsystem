import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ComponentStatusComponent } from './component-status.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentStatusComponent,
      },
    ]),
    KirbyModule,
  ],
  declarations: [ComponentStatusComponent],
  exports: [ComponentStatusComponent],
})
export class ComponentStatusModule {}
