import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-header-actions',
  template: '<ng-content></ng-content>',
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      padding: 0 var(--kirby-spacing-s) var(--kirby-spacing-s);
    }
  `,
})
export class SidebarHeaderActionsComponent {}
