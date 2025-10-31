import { NgModule } from '@angular/core';
import { SidebarComponent } from './public-components/sidebar';
import { SidebarFooterComponent } from './public-components/sidebar-footer';
import { SidebarHeaderComponent } from './public-components/sidebar-header';

@NgModule({
  imports: [SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent],
  exports: [SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent],
})
export class SidebarModule {}
