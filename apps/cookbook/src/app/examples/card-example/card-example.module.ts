import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, FlagComponent, IconModule, ItemModule } from '@kirbydesign/designsystem';

import { CardExampleComponent } from './card-example.component';
import { CardExampleBackgroundImageComponent } from './examples/background-image';

import { CardExampleDisclosureComponent } from './examples/disclosure';
import { CardExampleColorComponent } from './examples/color';
import { CardExampleVariantComponent } from './examples/variant';
import { CardExampleFlagComponent } from './examples/flag';

const COMPONENT_DECLARATIONS = [
  CardExampleComponent,
  CardExampleVariantComponent,
  CardExampleFlagComponent,
  CardExampleColorComponent,
  CardExampleDisclosureComponent,
  CardExampleBackgroundImageComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, CardModule, FlagComponent, IconModule, ItemModule],
  exports: COMPONENT_DECLARATIONS,
})
export class CardExampleModule {}
