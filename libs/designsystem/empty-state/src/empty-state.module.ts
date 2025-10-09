import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { EmptyStateComponent } from './empty-state.component';

@NgModule({
  imports: [IconModule, CommonModule, ThemeColorDirective, EmptyStateComponent],
  exports: [EmptyStateComponent, ThemeColorDirective],
})
export class EmptyStateModule {}
