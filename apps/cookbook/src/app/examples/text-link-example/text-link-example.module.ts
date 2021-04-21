import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { TextLinkExampleExternalLinkComponent } from './examples/external-link';
import { TextLinkExampleInlineLinksComponent } from './examples/inline-links';
import { TextLinkExampleInternalLinkComponent } from './examples/internal-link';

const COMPONENT_DECLARATIONS = [
  TextLinkExampleExternalLinkComponent,
  TextLinkExampleInternalLinkComponent,
  TextLinkExampleInlineLinksComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class TextLinkExampleModule {}
