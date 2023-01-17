import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { EmptyStateComponent } from './empty-state.component';

const declarations = [EmptyStateComponent];

@NgModule({
  imports: [IconModule, CommonModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class EmptyStateModule {}
