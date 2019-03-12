import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { declarations } from './kirby.common';
import { WindowRef } from './components/shared/window-ref/window-ref.service';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [InfiniteScrollDirective, ...declarations],
  exports: [InfiniteScrollDirective, ...declarations],
  providers: [WindowRef],
})
export class KirbyModule {}
