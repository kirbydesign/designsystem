import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ActionListDefaultExampleComponent } from './examples/default';

const COMPONENT_DECLARATIONS = [ActionListDefaultExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ActionListExampleModule {}
