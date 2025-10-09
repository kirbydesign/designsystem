import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderCustomFlagDirective,
  HeaderCustomSectionDirective,
  HeaderTitleActionIconDirective,
} from './header.component';

const declarations = [
  HeaderComponent,
  HeaderActionsDirective,
  HeaderCustomSectionDirective,
  HeaderTitleActionIconDirective,
  HeaderCustomFlagDirective,
];

@NgModule({
  imports: [CommonModule, FitHeadingDirective, ...declarations],
  exports: declarations,
})
export class HeaderModule {}
