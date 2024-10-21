import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { MultiCardListNoShapeExampleComponent } from './examples/multi-card-list-no-shape';
import { ListNoShapeExampleComponent } from './list-no-shape-example.component';
import { SimpleListNoShapeExampleComponent } from './examples/simple-list-no-shape';
import { DetailedCardWithListNoShapeComponent } from './examples/detailed-card-with-list-no-shape';

const COMPONENT_DECLARATIONS = [
  ListNoShapeExampleComponent,
  MultiCardListNoShapeExampleComponent,
  SimpleListNoShapeExampleComponent,
  DetailedCardWithListNoShapeComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ListNoShapeExampleModule {}
