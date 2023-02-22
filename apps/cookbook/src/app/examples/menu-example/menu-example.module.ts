import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { MenuDefaultExampleComponent } from './examples/default';
import { MenuAdvancedExampleComponent } from './examples/advanced';
import { MenuSelectableExampleComponent } from './examples/selectable';

const COMPONENT_DECLARATIONS = [
  MenuDefaultExampleComponent,
  MenuAdvancedExampleComponent,
  MenuSelectableExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class MenuExampleModule {}
