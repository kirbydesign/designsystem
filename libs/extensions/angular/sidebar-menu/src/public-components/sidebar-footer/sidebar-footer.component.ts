import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-footer',
  template: '<footer><ng-content></ng-content></footer>',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    :host,
    footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    :host {
      min-height: 80px;
    }
  `,
})
export class SidebarFooterComponent {}
