import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ItemComponent } from '@kirbydesign/designsystem/components/item/item.component';
import { LabelComponent } from '@kirbydesign/designsystem/components/item/label/label.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ItemComponent, LabelComponent],
  providers: [],
  exports: [ItemComponent, LabelComponent],
})
export class ItemModule {}
