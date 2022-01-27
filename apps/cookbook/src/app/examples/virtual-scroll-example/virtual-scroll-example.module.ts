import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { VirtualScrollListExampleComponent } from './virtual-scroll-list-example/virtual-scroll-list-example.component';

const virtualScrollExampleComponents = [VirtualScrollListExampleComponent];

@NgModule({
  imports: [CommonModule, KirbyModule, ScrollingModule],
  declarations: [...virtualScrollExampleComponents],
  exports: [...virtualScrollExampleComponents],
})
export class VirtualScrollExampleModule {}
