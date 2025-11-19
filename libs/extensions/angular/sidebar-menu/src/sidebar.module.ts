import { NgModule } from '@angular/core';
import { SidebarComponent } from './public-components/sidebar';
import { SidebarFooterComponent } from './public-components/sidebar-footer';
import { SidebarHeaderComponent } from './public-components/sidebar-header';
import { SidebarHeaderActionsComponent } from './public-components/sidebar-header-actions';

@NgModule({
  imports: [
    SidebarComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,
    SidebarHeaderActionsComponent,
  ],
  exports: [
    SidebarComponent,
    SidebarFooterComponent,
    SidebarHeaderComponent,
    SidebarHeaderActionsComponent,
  ],
})
export class SidebarModule {}
