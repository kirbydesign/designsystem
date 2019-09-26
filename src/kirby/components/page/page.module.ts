import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  PageComponent,
  PageContentDirective,
  PageFixedContentDirective,
  PageTitleActionsDirective,
  PageTitleDirective,
} from './page.component';

@NgModule({
  declarations: [
    PageComponent,
    PageTitleDirective,
    PageTitleActionsDirective,
    PageContentDirective,
    PageFixedContentDirective,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    PageComponent,
    PageTitleDirective,
    PageTitleActionsDirective,
    PageContentDirective,
    PageFixedContentDirective,
  ],
})
export class PageModule {}
