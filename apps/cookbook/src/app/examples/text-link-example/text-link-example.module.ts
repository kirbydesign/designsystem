import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { TextLinkExampleExternalLinkComponent } from './examples/external-link';
import { TextLinkExampleInternalLinkComponent } from './examples/internal-link';

const COMPONENT_DECLARATIONS = [
  TextLinkExampleExternalLinkComponent,
  TextLinkExampleInternalLinkComponent,
];

@NgModule({
  declarations: [COMPONENT_DECLARATIONS],
  imports: [CommonModule, KirbyModule],
  exports: [COMPONENT_DECLARATIONS],
})
export class TextLinkExampleModule {}
