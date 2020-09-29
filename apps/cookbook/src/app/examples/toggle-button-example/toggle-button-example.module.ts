import { NgModule } from '@angular/core';

import { ToggleButtonExampleComponent } from './toggle-button-example.component';
import { KirbyModule } from '@kirbydesign/designsystem';

const DECLARATIONS = [ToggleButtonExampleComponent];

@NgModule({
  imports: [KirbyModule],
  declarations: [...DECLARATIONS],
  exports: DECLARATIONS,
})
export class ToggleButtonExampleModule {}
