import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { ItemModule } from '@kirbydesign/designsystem/item';
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
import { DropdownExampleComponent } from './dropdown-example.component';

const COMPONENT_DECLARATIONS = [
  DropdownExampleComponent,
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardModule,
    DropdownModule,
    IconModule,
    CheckboxComponent,
    ItemModule,
  ],
  providers: [ToastHelper, ToastController],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DropdownExampleModule {}
