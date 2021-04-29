import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { LinkExampleExternalComponent } from './examples/external';

const COMPONENT_DECLARATIONS = [LinkExampleExternalComponent];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class LinkExampleModule {}
