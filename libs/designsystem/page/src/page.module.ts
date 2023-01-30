import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';
import { FitHeadingDirective } from './fit-heading';

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
  imports: [CommonModule, IonicModule, FitHeadingDirective, SpinnerModule],
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
    FitHeadingDirective,
    PageStickyContentDirective,
  ],
})
export class PageModule {}
