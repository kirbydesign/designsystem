import { Component } from '@angular/core';
import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page 
  title="Tab navigation" 
  subtitle="Page with tab navigation" 
  defaultBackHref="/">
  <kirby-tab-navigation 
    *kirbyPageStickyContent 
    [(selectedIndex)]="selectedIndex">
    <kirby-tab-navigation-item 
      label="{{labels[0]}}">
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item
      label="{{labels[1]}}">
      <kirby-badge themeColor="warning">
        <kirby-icon name="attach">
        </kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item 
      [truncate]="false"
      label="{{labels[2]}}">
      <kirby-badge themeColor="success">
        3
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item 
      label="{{labels[3]}}">
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item 
      label="{{labels[4]}}">
      <kirby-badge>
        <kirby-icon name="cog"></kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
    <kirby-tab-navigation-item 
      label="{{labels[5]}}">
      <kirby-badge>
        <kirby-icon name="cog"></kirby-icon>
      </kirby-badge>
    </kirby-tab-navigation-item>
  </kirby-tab-navigation>

  <kirby-page-content>
    <h4>About {{labels[selectedIndex]}}</h4>
    <p *ngIf="selectedIndex % 2 === 0">
      Aut, dignissimos dolorum ducimus et rem reprehenderit rerum sunt ut!
    </p>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageTabNavExampleComponent extends BasePageExampleComponent {
  selectedIndex = 0;
  labels = ['Item 1', 'Item 2 truncated', 'Item 3 not truncated', 'Item 4', 'Item 5', 'Item 6'];

  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
  static readonly codeSnippet = `selectedIndex = 0;
labels = ['Item 1', 'Item 2 truncated', 'Item 3 not truncated', 'Item 4', 'Item 5', 'Item 6']];
`;
}
