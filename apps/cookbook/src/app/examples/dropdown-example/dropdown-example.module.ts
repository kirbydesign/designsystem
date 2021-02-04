import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { DropdownExampleConfigurationComponent } from './dropdown-example-configuration-component/dropdown-example-configuration.component';
import { DropdownExampleAttentionLevelComponent } from './examples/attention-level';
import { DropdownExampleCustomItemTemplateComponent } from './examples/custom-item-template';
import { DropdownExampleDefaultComponent } from './examples/default';
import { DropdownExampleDropdownRightAlignedComponent } from './examples/dropdown-right-aligned';
import { DropdownExampleExpandComponent } from './examples/expand';
import { DropdownExampleItemSelectComponent } from './examples/item-select';
import { DropdownExampleNgFormsComponent } from './examples/ng-forms';
import { DropdownExamplePreSelectedComponent } from './examples/pre-selected';
import { DropdownExampleRightAlignedComponent } from './examples/right-aligned';
import { DropdownExampleScrollComponent } from './examples/scroll';

const COMPONENT_DECLARATIONS = [
  DropdownExampleConfigurationComponent,
  DropdownExampleDefaultComponent,
  DropdownExampleScrollComponent,
  DropdownExamplePreSelectedComponent,
  DropdownExampleExpandComponent,
  DropdownExampleRightAlignedComponent,
  DropdownExampleDropdownRightAlignedComponent,
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
