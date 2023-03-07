import { Component } from '@angular/core';

import { BasePageExampleComponent } from './base-page-example.component';

const config = {
  template: `<kirby-page title="Test" defaultBackHref="/">

  <kirby-header title="Title" subtitle1="Subtitle 1" subtitle2="Subtitle 2">
    <kirby-header-actions *kirbyHeaderActions>
      <button kirby-button>
        <kirby-icon name="edit"></kirby-icon>
        <span class="text">Action 1</span>
      </button>
      <button kirby-button attentionLevel="3">Action 2</button>
      <button kirby-button attentionLevel="3">Action 3</button>
    </kirby-header-actions>
  </kirby-header>

  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  styles: ['.custom-page-title { display: inline-flex; }'],
})
export class PageWithHeaderExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(' [innerHTML]="content">', '>...');

  constructor() {
    super();
  }
}
