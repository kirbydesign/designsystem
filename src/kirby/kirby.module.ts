import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { declarations } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [InfiniteScrollDirective, ...declarations],
  exports: [InfiniteScrollDirective, ...declarations],
})
export class KirbyModule {}
