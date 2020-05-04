import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { IconModule } from '../icon/icon.module';
import { ItemComponent } from './item.component';
import { LabelComponent } from './label/label.component';

@NgModule({
  imports: [IonicModule, IconModule, CommonModule],
  declarations: [ItemComponent, LabelComponent],
  providers: [],
  exports: [ItemComponent, LabelComponent],
})
export class ItemModule {}
