import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { IconModule } from '../icon/icon.module';

import { ItemResponsiveComponent } from './item-responsive/item-responsive.component';
import { ItemComponent } from './item.component';
import { LabelComponent } from './label/label.component';

@NgModule({
  imports: [IonicModule, IconModule, CommonModule],
  declarations: [ItemComponent, ItemResponsiveComponent, LabelComponent],
  exports: [ItemComponent, ItemResponsiveComponent, LabelComponent],
})
export class ItemModule {}
