import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ActionSheetExampleCustomButtonComponent } from './examples/custom-button';
import { ActionSheetExampleDefaultComponent } from './examples/default';
import { ActionSheetExampleProgramaticallyComponent } from './examples/programatically';

const COMPONENT_DECLARATIONS = [
  ActionSheetExampleCustomButtonComponent,
  ActionSheetExampleDefaultComponent,
  ActionSheetExampleProgramaticallyComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ActionSheetExampleModule {}
