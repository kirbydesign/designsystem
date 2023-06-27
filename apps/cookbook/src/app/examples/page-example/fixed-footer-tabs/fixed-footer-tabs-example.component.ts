import { Component } from '@angular/core';

const template = `<!-- This container is only needed due to layout of larger screen sizes -->
<div class="container">
  <div class="app-header">
    <!-- Hidden on small screen sizes-->
    <kirby-avatar size="sm" overlay="true" text="Logo" class="logo"></kirby-avatar>
  </div>

  <kirby-tab-bar>
    <kirby-tab-button routerLink="overview">
      <kirby-icon name="overview-outline"></kirby-icon>
      Overview
    </kirby-tab-button>

    <kirby-tab-button routerLink="transfer">
      <kirby-icon name="swap"></kirby-icon>
      Transfer
    </kirby-tab-button>

    <kirby-tab-button routerLink="inbox">
      <kirby-icon name="inbox-outline"></kirby-icon>
      Inbox
      <kirby-badge themeColor="danger">1</kirby-badge>
    </kirby-tab-button>

    <kirby-tab-button routerLink="menu">
      <kirby-icon name="menu-no-decoration"></kirby-icon>
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
}
