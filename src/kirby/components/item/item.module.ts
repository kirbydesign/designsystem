import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ItemComponent } from '@kirbydesign/designsystem/components/item/item.component';
import { LabelComponent } from '@kirbydesign/designsystem/components/item/label/label.component';
import { ValueComponent } from '@kirbydesign/designsystem/components/item/value/value.component';
import { ItemGroupComponent } from '@kirbydesign/designsystem/components/item/group/group.component';
import { ItemDividerComponent } from '@kirbydesign/designsystem/components/item/divider/divider.component';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/components/item/sliding/sliding.component';
import { ItemOptionsComponent } from '@kirbydesign/designsystem/components/item/options/options.component';
import { ItemOptionComponent } from '@kirbydesign/designsystem/components/item/option/option.component';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [
    ItemComponent,
    LabelComponent,
    ValueComponent,
    ItemGroupComponent,
    ItemDividerComponent,
    ItemSlidingComponent,
    ItemOptionsComponent,
    ItemOptionComponent,
  ],
  providers: [],
  exports: [
    ItemComponent,
    LabelComponent,
    ValueComponent,
    ItemGroupComponent,
    ItemDividerComponent,
    ItemSlidingComponent,
    ItemOptionsComponent,
    ItemOptionComponent,
  ],
})
export class ItemModule {}
