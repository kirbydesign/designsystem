import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';
import { DropdownExampleConfigurationComponent } from './dropdown-example-configuration-component/dropdown-example-configuration.component';
import { DropdownExampleDefaultComponent } from './examples/default';
import { DropdownExampleScrollComponent } from './examples/scroll';
import { DropdownExamplePreSelectedComponent } from './examples/pre-selected';
import { DropdownExampleExpandComponent } from './examples/expand';
import { DropdownExampleRightAlignedComponent } from './examples/right-aligned';
import { DropdownExampleAttentionLevelComponent } from './examples/attention-level';
import { DropdownExampleItemSelectComponent } from './examples/item-select';
import { DropdownExampleCustomItemTemplateComponent } from './examples/custom-item-template';
import { DropdownExampleNgFormsComponent } from './examples/ng-forms';

const COMPONENT_DECLARATIONS = [
  DropdownExampleConfigurationComponent,
  DropdownExampleDefaultComponent,
  DropdownExampleScrollComponent,
  DropdownExamplePreSelectedComponent,
  DropdownExampleExpandComponent,
  DropdownExampleRightAlignedComponent,
  DropdownExampleAttentionLevelComponent,
  DropdownExampleItemSelectComponent,
  DropdownExampleCustomItemTemplateComponent,
  DropdownExampleNgFormsComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DropdownExampleModule {}
