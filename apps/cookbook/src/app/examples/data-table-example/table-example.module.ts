import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { DataTableCardExampleComponent } from './examples/card';
import { DataTableDefaultExampleComponent } from './examples/default';

const COMPONENT_DECLARATIONS = [DataTableCardExampleComponent, DataTableDefaultExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class DataTableExampleModule {}
