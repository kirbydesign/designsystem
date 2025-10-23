import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-header',
  template: '<span class="sidebar-logo"><ng-content></ng-content></span>',
  styles: [
    `
      .sidebar-logo {
        display: flex;
        align-items: center;
        margin: 32px 0;
        height: 50px;
      }
    `,
  ],
})
export class SidebarHeaderComponent {}
