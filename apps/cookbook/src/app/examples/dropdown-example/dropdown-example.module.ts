import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { KirbyModule } from '@kirbydesign/designsystem';

import { DropdownExampleConfigurationComponent } from './dropdown-example-configuration-component/dropdown-example-configuration.component';
import { DropdownExampleAttentionLevelComponent } from './examples/attention-level';
import { DropdownExampleCustomItemTemplateComponent } from './examples/custom-item-template';
import { DropdownExampleDefaultComponent } from './examples/default';
import { DropdownExampleExpandComponent } from './examples/expand';
import { DropdownExampleItemSelectComponent } from './examples/item-select';
import { DropdownExampleNgFormsComponent } from './examples/ng-forms';
import { DropdownExamplePreSelectedComponent } from './examples/pre-selected';
import { DropdownExampleRightAlignedComponent } from './examples/right-aligned';
import { DropdownExampleScrollComponent } from './examples/scroll';
import { DropdownExamplePopoverComponent } from '~/app/examples/dropdown-example/examples/popover';

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
  DropdownExamplePopoverComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, ReactiveFormsModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DropdownExampleModule {}
