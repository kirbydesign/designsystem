import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { LinkExampleExternalComponent } from './examples/external';
import { LinkExampleInternalComponent } from './examples/internal';

const COMPONENT_DECLARATIONS = [LinkExampleExternalComponent, LinkExampleInternalComponent];

@NgModule({
  imports: [CommonModule, KirbyModule, RouterModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class LinkExampleModule {}
