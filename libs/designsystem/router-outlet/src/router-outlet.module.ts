import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RouterOutletComponent } from './router-outlet.component';

@NgModule({
  declarations: [RouterOutletComponent],
  imports: [CommonModule, IonicModule],
  exports: [RouterOutletComponent],
})
export class RouterOutletModule {}
