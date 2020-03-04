import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { IconModule } from '@kirbydesign/designsystem/components/icon/icon.module';
import { ItemComponent } from '@kirbydesign/designsystem/components/item/item.component';
import { LabelComponent } from '@kirbydesign/designsystem/components/item/label/label.component';

@NgModule({
  imports: [IonicModule, IconModule, CommonModule],
  declarations: [ItemComponent, LabelComponent],
  providers: [],
  exports: [ItemComponent, LabelComponent],
})
export class ItemModule {}
