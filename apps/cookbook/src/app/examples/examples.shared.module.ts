import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExampleConfigurationWrapperComponent } from './example-configuration-wrapper/example-configuration-wrapper.component';

const COMPONENT_DECLARATIONS = [ExampleConfigurationWrapperComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ExamplesSharedModule {}
