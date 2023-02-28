import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/page';
import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderCustomSectionDirective,
  HeaderCustomTitleDirective,
  HeaderCustomValueDirective,
} from './header.component';

const declarations = [
  HeaderComponent,
  HeaderCustomTitleDirective,
  HeaderCustomValueDirective,
  HeaderCustomSectionDirective,
  HeaderActionsDirective,
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective],
  exports: declarations,
})
export class HeaderModule {}
