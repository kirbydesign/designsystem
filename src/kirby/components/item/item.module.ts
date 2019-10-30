import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ItemComponent } from '@kirbydesign/designsystem/components/item/item.component';
import { LabelComponent } from '@kirbydesign/designsystem/components/item/label/label.component';
import { ValueComponent } from '@kirbydesign/designsystem/components/item/value/value.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ItemComponent, LabelComponent, ValueComponent],
  providers: [],
  exports: [ItemComponent, LabelComponent, ValueComponent],
})
export class ItemModule {}
