import { NgModule } from '@angular/core';
import { KirbyBadge } from './web-component-proxies.component';

@NgModule({
  declarations: [KirbyBadge],
  exports: [KirbyBadge],
})
export class KirbyBadgeModule {}
