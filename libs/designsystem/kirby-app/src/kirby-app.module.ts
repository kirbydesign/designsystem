import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppComponent as KirbyAppComponent } from './kirby-app.component';

@NgModule({
  declarations: [KirbyAppComponent],
  imports: [CommonModule, IonicModule],
  exports: [KirbyAppComponent],
})
export class KirbyAppModule {}
