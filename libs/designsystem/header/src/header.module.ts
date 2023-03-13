import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';

import { HeaderActionsDirective, HeaderComponent } from './header.component';
import { HeaderActionsComponent } from './header-actions.component';

const declarations = [HeaderComponent, HeaderActionsComponent, HeaderActionsDirective];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective, ButtonComponent, IconModule, DropdownModule],
  exports: declarations,
})
export class HeaderModule {}
