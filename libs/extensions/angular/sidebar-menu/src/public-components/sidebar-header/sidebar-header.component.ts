import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-x-sidebar-header',
  template: `
    <header>
      <span class="sidebar-logo"><ng-content select="[slot='logo']"></ng-content></span>
      <div class="action-bar">
        <ng-content select="[slot='action']"></ng-content>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    :host,
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    :host::ng-deep [slot='logo'] {
      display: inline-flex;
    }

    :host::ng-deep [slot='logo'] img,
    :host::ng-deep img[slot='logo'] {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
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

      &:has([slot='action']) {
        padding: 0 var(--kirby-spacing-xs) var(--kirby-spacing-xs);
      }
    }
  `,
})
export class SidebarHeaderComponent {}
