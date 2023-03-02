import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { HeaderExampleComponent } from './header-example.component';

import { HeaderExampleDefaultComponent } from './examples/default';
import { HeaderExampleAvatarComponent } from './examples/avatar';
import { HeaderExampleFlagComponent } from './examples/flag';
import { HeaderExampleValueComponent } from './examples/value';

const COMPONENT_DECLARATIONS = [
  HeaderExampleComponent,
  HeaderExampleDefaultComponent,
  HeaderExampleAvatarComponent,
  HeaderExampleFlagComponent,
  HeaderExampleValueComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class HeaderExampleModule {}
