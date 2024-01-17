import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { ItemComponent } from './item.component';
import { LabelComponent } from './label/label.component';

const declarations = [ItemComponent, LabelComponent];
@NgModule({
  imports: [IconModule, CommonModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class ItemModule {}
