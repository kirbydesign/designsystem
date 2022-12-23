import { NgModule } from '@angular/core';
import { KirbyBadge } from './web-component-proxies.component';

@NgModule({
  imports: [KirbyBadge],
  exports: [KirbyBadge],
})
export class KirbyBadgeModule {}
