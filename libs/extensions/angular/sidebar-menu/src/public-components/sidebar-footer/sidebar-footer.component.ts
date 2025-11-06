import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-footer',
  template: '<ng-content></ng-content>',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80px;
    }
  `,
})
export class SidebarFooterComponent {}
