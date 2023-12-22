import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { SectionHeaderWithCardComponent } from './examples/header-with-card';
import { SectionHeaderHeadingWithLabelExampleComponent } from './examples/heading-with-label';
import { SectionHeaderLabelAndDetailExampleComponent } from './examples/label-and-detail';
import { SectionHeaderHeadingWithMultilineLabelExampleComponent } from './examples/heading-with-multiline-label';

const DECLARATIONS = [
  SectionHeaderWithCardComponent,
  SectionHeaderHeadingWithLabelExampleComponent,
  SectionHeaderLabelAndDetailExampleComponent,
  SectionHeaderHeadingWithMultilineLabelExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class SectionHeaderExampleModule {}
