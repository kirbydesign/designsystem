import { Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-header',
  template: `
    <span class="sidebar-logo"><ng-content></ng-content></span>
    <div class="action-bar">
      <ng-content select="[slot='search']"></ng-content>
      <ng-content select="[slot='action']"></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }

    :host::ng-deep .sidebar-logo > img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      height: 50px;
      margin: var(--kirby-spacing-l) var(--kirby-spacing-m);
    }

    .action-bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;

      &:has(button) {
        padding: 0 var(--kirby-spacing-s) var(--kirby-spacing-s);
      }
    }
  `,
})
export class SidebarHeaderComponent {}
