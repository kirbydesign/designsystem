import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ItemComponent } from './item.component';
import { LabelComponent } from './label/label.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ItemComponent, LabelComponent],
  providers: [],
  exports: [ItemComponent, LabelComponent],
})
export class ItemModule {}
