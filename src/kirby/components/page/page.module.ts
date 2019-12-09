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
import { FitHeaderModule } from '@kirbydesign/designsystem/directives/fit-header/fit-header.module';

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
  imports: [CommonModule, IonicModule, FitHeaderModule],
  exports: [
    PageComponent,
    PageActionsComponent,
    PageActionsDirective,
    PageContentComponent,
    PageContentDirective,
    PageTitleDirective,
    PageToolbarTitleDirective,
    FitHeaderModule,
  ],
})
export class PageModule {}
