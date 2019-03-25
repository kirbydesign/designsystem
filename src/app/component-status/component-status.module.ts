import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

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
    IonicModule.forRoot(),
  ],
  declarations: [ComponentStatusComponent],
  exports: [ComponentStatusComponent],
})
export class ComponentStatusModule {}
