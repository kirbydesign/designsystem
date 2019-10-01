import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  PageComponent,
  PageContentDirective,
  PageContentFixedDirective,
  PageFloatingActionsDirective,
  PageFloatingTitleDirective,
  PageContentComponent,
  PageActionsComponent,
} from './page.component';

@NgModule({
  declarations: [
    PageComponent,
    PageFloatingTitleDirective,
    PageFloatingActionsDirective,
    PageContentDirective,
    PageContentFixedDirective,
    PageContentComponent,
    PageActionsComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    PageComponent,
    PageFloatingTitleDirective,
    PageFloatingActionsDirective,
    PageContentDirective,
    PageContentFixedDirective,
    PageContentComponent,
    PageActionsComponent,
  ],
})
export class PageModule {}
