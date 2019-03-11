import { NgModule } from '@angular/core';
import { ComponentStatusComponent } from './component-status.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentStatusComponent,
      },
    ]),
  ],
  declarations: [ComponentStatusComponent],
  exports: [ComponentStatusComponent],
})
export class ComponentStatusModule {}
