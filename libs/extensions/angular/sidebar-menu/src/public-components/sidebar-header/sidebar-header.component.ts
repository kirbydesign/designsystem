import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-header',
  template: `
    <span class="sidebar-logo"><ng-content></ng-content></span>
    <ng-content select="kirby-x-sidebar-header-actions"></ng-content>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      height: 50px;
      margin: var(--kirby-spacing-l) var(--kirby-spacing-m);
    }
  `,
})
export class SidebarHeaderComponent {}
