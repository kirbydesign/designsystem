import { Component } from '@angular/core';

const template = `<!-- This container is only needed due to layout of larger screen sizes -->
<div class="container">
  <div class="app-header">
    <!-- Hidden on small screen sizes-->
    <kirby-avatar size="sm" overlay="true" text="Logo" class="logo"></kirby-avatar>
  </div>

  <kirby-tab-bar>
    <kirby-tab-button routerLink="dashboard">
      <kirby-icon name="person-outline"></kirby-icon>
      <kirby-icon name="person" selected-tab></kirby-icon>
      Dashboard
    </kirby-tab-button>

    <kirby-tab-button routerLink="account">
      <kirby-icon name="accounts-outline"></kirby-icon>
      <kirby-icon name="accounts" selected-tab></kirby-icon>
      Account
    </kirby-tab-button>

    <kirby-tab-button routerLink="inbox">
      <kirby-icon name="inbox-outline"></kirby-icon>
      <kirby-icon name="inbox" selected-tab></kirby-icon>
      Inbox
      <kirby-badge themeColor="danger">1</kirby-badge>
    </kirby-tab-button>

    <kirby-tab-button (click)="openMenu()">
      <kirby-icon name="menu-outline"></kirby-icon>
      Menu
    </kirby-tab-button>
  </kirby-tab-bar>
</div>`;

@Component({
  selector: 'cookbook-fixed-footer-tabs-example',
  template,
  styleUrls: ['./fixed-footer-tabs-example.component.scss'],
})
export class PageFixedFooterTabsExampleComponent {
  static template = template;

  openMenu() {
    alert('Open menu');
  }
}
