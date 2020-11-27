import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { TextLinkExampleIconComponent } from './examples/icon';
import { TextLinkExampleDefaultComponent } from './examples/default';

const COMPONENT_DECLARATIONS = [TextLinkExampleIconComponent, TextLinkExampleDefaultComponent];

@NgModule({
  declarations: [COMPONENT_DECLARATIONS],
  imports: [CommonModule, KirbyModule],
  exports: [COMPONENT_DECLARATIONS],
})
export class TextLinkExampleModule {}
