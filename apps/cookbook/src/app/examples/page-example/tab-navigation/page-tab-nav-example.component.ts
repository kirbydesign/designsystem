import { Component } from '@angular/core';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page
  title="NO Tab navigation"
  subtitle="Page with tab navigation"
  defaultBackHref="/">
  <kirby-tab-navigation *kirbyPageStickyContent [(selectedIndex)]="selectedIndex">
    <kirby-tab-navigation-item>
      <span text>{{ tabTexts[0] }}</span>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item>
      <span text>{{ tabTexts[1] }}</span>
      <kirby-badge themeColor="warning">
        <kirby-icon name="attach"></kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item>
      <span text>{{ tabTexts[2] }}</span>
      <kirby-badge themeColor="success">3</kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item>
      <span text>{{ tabTexts[3] }}</span>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item>
      <span text>{{ tabTexts[4] }}</span>
      <kirby-badge>
        <kirby-icon name="cog"></kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
  </kirby-tab-navigation>

  <kirby-page-content>
    <h4>About {{ tabTexts[selectedIndex] }}</h4>
    <p *ngIf="selectedIndex % 2 === 0">
      Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut!
    </p>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  //template: config.template,
  templateUrl: './page-tab-nav-example.component.html',
})
export class PageTabNavExampleComponent extends BasePageExampleComponent {
  selectedIndex = 0;
  tabTexts = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
  static readonly codeSnippet = `selectedIndex = 0;
tabTexts = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
`;
}
