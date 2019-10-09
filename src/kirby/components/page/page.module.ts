import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  PageComponent,
  PageActionsComponent,
  PageActionsDirective,
  PageContentComponent,
  PageContentDirective,
  PageTitleDirective,
  PageToolbarTitleDirective,
} from './page.component';

@NgModule({
  declarations: [
    PageComponent,
    PageActionsComponent,
    PageActionsDirective,
    PageContentComponent,
    PageContentDirective,
    PageTitleDirective,
    PageToolbarTitleDirective,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    PageComponent,
    PageActionsComponent,
    PageActionsDirective,
    PageContentComponent,
    PageContentDirective,
    PageTitleDirective,
    PageToolbarTitleDirective,
  ],
})
export class PageModule {}
