import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { SectionHeaderWithCardComponent } from './examples/header-with-card';
import { SectionHeaderHeadingWithLabelExampleComponent } from './examples/heading-with-label';
import { SectionHeaderLabelAndDetailExampleComponent } from './examples/label-and-detail';

const DECLARATIONS = [
  SectionHeaderWithCardComponent,
  SectionHeaderHeadingWithLabelExampleComponent,
  SectionHeaderLabelAndDetailExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class SectionHeaderExampleModule {}
