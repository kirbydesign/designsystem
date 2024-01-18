import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import { HeaderModule } from '@kirbydesign/designsystem/header';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonRefresher,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
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
  imports: [
    CommonModule,
    FitHeadingDirective,
    SpinnerModule,
    HeaderModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonTitle,
    IonRefresher,
    IonFooter,
  ],
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
