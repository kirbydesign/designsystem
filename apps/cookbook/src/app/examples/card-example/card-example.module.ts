import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { CardExampleComponent } from './card-example.component';
import { CardExampleBackgroundImageComponent } from './examples/background-image';

import { CardWithItemHeaderExampleComponent } from './examples/card-with-item-header-example/card-with-item-header-example.component';
import { CardExampleClickableComponent } from './examples/clickable';
import { CardExampleColorComponent } from './examples/color';
import { CardExampleDefaultComponent } from './examples/default';
import { CardExampleFlagComponent } from './examples/flag';

const COMPONENT_DECLARATIONS = [
  CardExampleComponent,
  CardWithItemHeaderExampleComponent,
  CardExampleDefaultComponent,
  CardExampleFlagComponent,
  CardExampleColorComponent,
  CardExampleClickableComponent,
  CardExampleBackgroundImageComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class CardExampleModule {}
