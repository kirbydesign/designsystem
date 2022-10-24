import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FitHeadingModule } from '../../directives/fit-heading/fit-heading.module';
import { SpinnerModule } from '../spinner/spinner.module';

import { PageFooterComponent } from './page-footer/page-footer.component';
import {
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageContentDirective,
  PageProgressComponent,
  PageStickyContentDirective,
  PageSubtitleDirective,
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
    PageProgressComponent,
    PageTitleComponent,
    PageTitleDirective,
    PageSubtitleDirective,
    PageToolbarTitleDirective,
    PageStickyContentDirective,
  ],
  imports: [CommonModule, IonicModule, FitHeadingModule, SpinnerModule],
  exports: [
    PageComponent,
    PageActionsComponent,
    PageActionsDirective,
    PageContentComponent,
    PageFooterComponent,
    PageContentDirective,
    PageProgressComponent,
    PageTitleComponent,
    PageTitleDirective,
    PageSubtitleDirective,
    PageToolbarTitleDirective,
    FitHeadingModule,
    PageStickyContentDirective,
  ],
})
export class PageModule {}
