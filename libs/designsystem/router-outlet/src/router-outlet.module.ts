import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterOutletComponent } from './router-outlet.component';

@NgModule({
  declarations: [RouterOutletComponent],
  imports: [CommonModule, IonRouterOutlet],
  exports: [RouterOutletComponent],
})
export class RouterOutletModule {}
