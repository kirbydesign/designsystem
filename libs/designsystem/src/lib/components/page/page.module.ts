import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FitHeadingModule } from '../../directives/fit-heading/fit-heading.module';
import { PageTitleComponent } from './title/page-title.component';
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
    PageTitleComponent,
    PageTitleDirective,
    PageToolbarTitleDirective,
  ],
  imports: [CommonModule, IonicModule, FitHeadingModule],
  exports: [
    PageComponent,
    PageActionsComponent,
    PageActionsDirective,
    PageContentComponent,
    PageContentDirective,
    PageTitleComponent,
    PageTitleDirective,
    PageToolbarTitleDirective,
    FitHeadingModule,
  ],
})
export class PageModule {}
