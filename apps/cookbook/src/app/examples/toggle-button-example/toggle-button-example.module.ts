import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ToggleButtonExampleComponent } from './toggle-button-example.component';

const DECLARATIONS = [ToggleButtonExampleComponent];

@NgModule({
  imports: [KirbyModule, ...DECLARATIONS],
  exports: DECLARATIONS,
})
export class ToggleButtonExampleModule {}
