import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { LinkExampleDefaultComponent } from './examples/default';
import { LinkExampleNewTabComponent } from './examples/new-tab';
import { LinkExampleTrailingIconComponent } from '~/app/examples/link-example/examples/trailing-icon';

const COMPONENT_DECLARATIONS = [
  LinkExampleNewTabComponent,
  LinkExampleDefaultComponent,
  LinkExampleTrailingIconComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule, RouterModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class LinkExampleModule {}
