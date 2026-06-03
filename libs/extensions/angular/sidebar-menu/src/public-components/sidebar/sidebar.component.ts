import { Component } from '@angular/core';
import { SidebarContainerComponent } from '../../components/sidebar-container';

@Component({
  selector: 'kirby-x-sidebar',
  template: `
    <aside kirby-x-sidebar-container>
      <ng-content select="kirby-x-sidebar-header" slot="header"></ng-content>
      <ng-content select="kirby-x-sidebar-footer" slot="footer"></ng-content>
      <ng-content slot="content"></ng-content>
    </aside>
  `,
  imports: [SidebarContainerComponent],
})
export class SidebarComponent {}
