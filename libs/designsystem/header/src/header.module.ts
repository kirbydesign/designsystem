import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/shared';
import { HeaderComponent } from './header.component';

const declarations = [HeaderComponent];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective],
  exports: declarations,
})
export class HeaderModule {}
