import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderCustomFlagDirective,
  HeaderCustomSectionDirective,
  HeaderSubtitleDirective,
  HeaderTitleActionIconDirective,
} from './header.component';

const declarations = [
  HeaderComponent,
  HeaderActionsDirective,
  HeaderCustomSectionDirective,
  HeaderTitleActionIconDirective,
  HeaderCustomFlagDirective,
  HeaderSubtitleDirective,
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective],
  exports: declarations,
})
export class HeaderModule {}
