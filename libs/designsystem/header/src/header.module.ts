import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import {
  HeaderActionsComponent,
  HeaderActionsDirective,
  HeaderComponent,
} from './header.component';

const declarations = [HeaderComponent, HeaderActionsComponent, HeaderActionsDirective];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective, ButtonComponent, IconModule],
  exports: declarations,
})
export class HeaderModule {}
