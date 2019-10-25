import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ItemComponent } from '@kirbydesign/designsystem/components/item/item.component';
import { LabelComponent } from '@kirbydesign/designsystem/components/item/label/label.component';
import { TitleComponent } from '@kirbydesign/designsystem/components/item/title/title.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [ItemComponent, LabelComponent, TitleComponent],
  providers: [],
  exports: [ItemComponent, LabelComponent, TitleComponent],
})
export class ItemModule {}
