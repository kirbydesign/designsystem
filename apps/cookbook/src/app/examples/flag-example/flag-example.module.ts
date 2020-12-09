import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { FlagExampleColorsComponent } from './examples/colors';
import { FlagExampleSizesComponent } from './examples/sizes';

const COMPONENT_DECLARATIONS = [FlagExampleColorsComponent, FlagExampleSizesComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FlagExampleModule {}
