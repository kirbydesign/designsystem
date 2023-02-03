import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FitHeadingDirective } from '@kirbydesign/designsystem/page';
import {
  HeaderComponent,
  KirbyHeaderActionsDirective,
  KirbyHeaderAvatarDirective,
  KirbyHeaderCustomSectionDirective,
  KirbyHeaderFlagDirective,
  KirbyHeaderSubtitle1Directive,
  KirbyHeaderSubtitle2Directive,
  KirbyHeaderTitleDirective,
  KirbyHeaderValueDirective,
} from './header.component';

const declarations = [
  HeaderComponent,
  KirbyHeaderAvatarDirective,
  KirbyHeaderFlagDirective,
  KirbyHeaderTitleDirective,
  KirbyHeaderValueDirective,
  KirbyHeaderSubtitle1Directive,
  KirbyHeaderSubtitle2Directive,
  KirbyHeaderCustomSectionDirective,
  KirbyHeaderActionsDirective,
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, FitHeadingDirective],
  exports: declarations,
})
export class HeaderModule {}
