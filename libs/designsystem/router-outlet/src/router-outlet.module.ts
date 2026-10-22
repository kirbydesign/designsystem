import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet } from '@ionic/angular';
import { RouterOutletComponent } from './router-outlet.component';

@NgModule({
  imports: [CommonModule, IonRouterOutlet, RouterOutletComponent],
  exports: [RouterOutletComponent],
})
export class RouterOutletModule {}
