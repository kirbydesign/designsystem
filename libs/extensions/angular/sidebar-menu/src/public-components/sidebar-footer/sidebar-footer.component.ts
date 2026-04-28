import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-footer',
  template: '<footer><ng-content></ng-content></footer>',
  styles: `
    :host,
    footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }

    :host {
      min-height: 80px;
    }


  `,
})
export class SidebarFooterComponent {}
