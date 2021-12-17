import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ItemSlidingConditionalExampleComponent } from './examples/item-sliding-conditional-example.component';
import { ItemSlidingSimpleExampleComponent } from './examples/item-sliding-simple-example.component';
import { ItemSlidingExampleComponent } from './item-sliding-example.component';

const COMPONENT_DECLARATIONS = [
  ItemSlidingExampleComponent,
  ItemSlidingConditionalExampleComponent,
  ItemSlidingSimpleExampleComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class ItemSlidingExampleModule {}
