import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FitHeadingModule } from '../../directives/fit-heading/fit-heading.module';

import { PageFooterComponent } from './page-footer/page-footer.component';
import {
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageContentDirective,
  PageTitleComponent,
  PageTitleDirective,
  PageToolbarTitleDirective,
} from './page.component';

@NgModule({
  declarations: [
    PageComponent,
    PageActionsComponent,
    PageActionsDirective,
    PageContentComponent,
    PageFooterComponent,
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
    PageFooterComponent,
    PageContentDirective,
    PageTitleComponent,
    PageTitleDirective,
    PageToolbarTitleDirective,
    FitHeadingModule,
  ],
})
export class PageModule {}
