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
      height: 50px;
      margin: 32px 0;
      padding: 0 24px;
    }
  `,
})
export class SidebarHeaderComponent {}
