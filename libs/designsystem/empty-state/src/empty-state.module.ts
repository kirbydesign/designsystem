import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { EmptyStateComponent } from './empty-state.component';

@NgModule({
  imports: [IconModule, CommonModule, EmptyStateComponent],
  exports: [EmptyStateComponent],
})
export class EmptyStateModule {}
