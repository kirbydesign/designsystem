import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  PageComponent,
  PageContentDirective,
  PageContentFixedDirective,
  PageStickyActionsDirective,
  PageStickyTitleDirective,
  PageStickyToolbarTitleDirective,
  PageContentComponent,
  PageActionsComponent,
} from './page.component';

@NgModule({
  declarations: [
    PageComponent,
    PageStickyTitleDirective,
    PageStickyToolbarTitleDirective,
    PageStickyActionsDirective,
    PageContentDirective,
    PageContentFixedDirective,
    PageContentComponent,
    PageActionsComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    PageComponent,
    PageStickyTitleDirective,
    PageStickyToolbarTitleDirective,
    PageStickyActionsDirective,
    PageContentDirective,
    PageContentFixedDirective,
    PageContentComponent,
    PageActionsComponent,
  ],
})
export class PageModule {}
