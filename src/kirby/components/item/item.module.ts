import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ItemComponent } from '@kirbydesign/designsystem/components/item/item.component';

@NgModule({
  imports: [IonicModule],
  declarations: [ItemComponent],
  providers: [],
  exports: [ItemComponent],
})
export class ItemModule {}
