import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderCustomSectionDirective,
} from './header.component';

const declarations = [HeaderComponent, HeaderActionsDirective, HeaderCustomSectionDirective];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective],
  exports: declarations,
})
export class HeaderModule {}
