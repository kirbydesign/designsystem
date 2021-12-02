import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { SectionHeaderWithCardComponent } from './examples/header-with-card';
import { SectionHeaderWithItemGroupComponent } from './examples/header-with-item-group';

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: [SectionHeaderWithCardComponent, SectionHeaderWithItemGroupComponent],
  exports: [SectionHeaderWithCardComponent, SectionHeaderWithItemGroupComponent],
})
export class SectionHeaderExampleModule {}
