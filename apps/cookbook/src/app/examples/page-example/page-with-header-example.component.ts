import { Component } from '@angular/core';

import { BasePageExampleComponent } from './base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">
  <kirby-header title="Title" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-action-group *kirbyHeaderActions>
      <button kirby-button (click)="actionClicked('Action 1')">
        <kirby-icon name="edit"></kirby-icon>
        <span class="text">Action 1</span>
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 2')">
        Action 2
      </button>
      <button kirby-button attentionLevel="3" (click)="actionClicked('Action 3')">
        Action 3
        </button>
    </kirby-action-group>
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

  actionClicked(action: string) {
    console.log(action);
  }
}
