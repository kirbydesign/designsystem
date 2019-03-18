import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { declarations } from './kirby.common';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  declarations: declarations,
  exports: declarations,
})
export class KirbyModule {}
