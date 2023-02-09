import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ActionListDefaultExampleComponent } from './examples/default';
import { ActionListAdvancedExampleComponent } from './examples/advanced';
import { ActionListSelectableExampleComponent } from './examples/selectable';

const COMPONENT_DECLARATIONS = [
  ActionListDefaultExampleComponent,
  ActionListAdvancedExampleComponent,
  ActionListSelectableExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ActionListExampleModule {}
