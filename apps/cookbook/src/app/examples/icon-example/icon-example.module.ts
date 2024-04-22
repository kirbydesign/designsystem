import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { IconDefaultExampleComponent } from './examples/default';
import { IconCustomExampleComponent } from './examples/custom';
import { IconSizesExampleComponent } from './examples/sizes';

const COMPONENT_DECLARATIONS = [
  IconDefaultExampleComponent,
  IconCustomExampleComponent,
  IconSizesExampleComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class IconExampleModule {}
