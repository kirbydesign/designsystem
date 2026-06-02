import { Component } from '@angular/core';
import { SidebarMenuComponent } from '../../components/sidebar-menu';

@Component({
  selector: 'kirby-x-sidebar',
  template: `
    <aside kirby-x-sidebar-menu>
      <ng-content select="kirby-x-sidebar-header" slot="header"></ng-content>
      <ng-content select="kirby-x-sidebar-menu-content" slot="content"></ng-content>
      <ng-content select="kirby-x-sidebar-footer" slot="footer"></ng-content>
    </aside>
  `,
  imports: [SidebarMenuComponent],
})
export class SidebarComponent {}
