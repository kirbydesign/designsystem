import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/page';
import {
  HeaderActionsDirective,
  HeaderAvatarDirective,
  HeaderComponent,
  HeaderCustomSectionDirective,
  HeaderFlagDirective,
  HeaderSubtitle1Directive,
  HeaderSubtitle2Directive,
  HeaderTitleDirective,
  HeaderValueDirective,
} from './header.component';

const declarations = [
  HeaderComponent,
  HeaderAvatarDirective,
  HeaderFlagDirective,
  HeaderTitleDirective,
  HeaderValueDirective,
  HeaderSubtitle1Directive,
  HeaderSubtitle2Directive,
  HeaderCustomSectionDirective,
  HeaderActionsDirective,
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective],
  exports: declarations,
})
export class HeaderModule {}
