import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ItemGroupSimpleExampleComponent } from './examples/simple';
import { ItemGroupWithSectionHeaderExampleComponent } from './examples/with-header';

const DECLARATIONS = [ItemGroupSimpleExampleComponent, ItemGroupWithSectionHeaderExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class ItemGroupExampleModule {}
