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

const imports = [
  HeaderComponent,
  HeaderActionsDirective,
  HeaderCustomSectionDirective,
  HeaderTitleActionIconDirective,
  HeaderCustomFlagDirective,
];

@NgModule({
  imports: [CommonModule, FitHeadingDirective, ...imports],
  exports: imports,
})
export class HeaderModule {}
