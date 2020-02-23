import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { DropdownExampleDefaultComponent } from './examples/default';
import { DropdownExampleScrollComponent } from './examples/scroll';
import { DropdownExampleExpandComponent } from './examples/expand';
import { DropdownExampleAttentionLevelComponent } from './examples/attention-level';
import { DropdownExampleCustomItemTemplateComponent } from './examples/custom-item-template';

const COMPONENT_DECLARATIONS = [
  DropdownExampleDefaultComponent,
  DropdownExampleScrollComponent,
  DropdownExampleExpandComponent,
  DropdownExampleAttentionLevelComponent,
  DropdownExampleCustomItemTemplateComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DropdownExampleModule {}
