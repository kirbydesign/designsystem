import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { CardExampleComponent } from './card-example.component';
import { CardExampleBackgroundImageComponent } from './examples/background-image';

import { CardExampleDisclosureComponent } from './examples/disclosure';
import { CardExampleColorComponent } from './examples/color';
import { CardExampleDefaultComponent } from './examples/default';
import { CardExampleFlagComponent } from './examples/flag';

const COMPONENT_DECLARATIONS = [
  CardExampleComponent,
  CardExampleDefaultComponent,
  CardExampleFlagComponent,
  CardExampleColorComponent,
  CardExampleDisclosureComponent,
  CardExampleBackgroundImageComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class CardExampleModule {}
