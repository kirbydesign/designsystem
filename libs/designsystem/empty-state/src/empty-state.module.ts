import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { EmptyStateComponent } from './empty-state.component';

const declarations = [EmptyStateComponent];

@NgModule({
  imports: [IconModule, CommonModule, ThemeColorDirective],
  declarations: [...declarations],
  exports: [...declarations, ThemeColorDirective],
})
export class EmptyStateModule {}
