import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-header',
  template: '<ng-content></ng-content>',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      height: var(--kirby-x-sidebar-header-height, 50px);
      margin: var(--kirby-x-sidebar-header-margin-top, 32px)
        var(--kirby-x-sidebar-header-margin-right, 24px)
        var(--kirby-x-sidebar-header-margin-bottom, 32px)
        var(--kirby-x-sidebar-header-margin-left, 24px);
    }
  `,
})
export class SidebarHeaderComponent {}
