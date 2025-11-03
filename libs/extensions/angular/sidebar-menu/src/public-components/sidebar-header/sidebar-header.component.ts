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
      height: var(--kirby-x-sidebar-header-height, 50px);
      padding: var(--kirby-x-sidebar-header-padding-top, 32px)
        var(--kirby-x-sidebar-header-padding-right, 24px)
        var(--kirby-x-sidebar-header-padding-bottom, 32px)
        var(--kirby-x-sidebar-header-padding-left, 24px);
    }
  `,
})
export class SidebarHeaderComponent {}
