import { Component } from '@angular/core';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page title="Simple Page with very very very very very very very very long title!!!" defaultBackHref="/" titleMaxLines="2" titleTruncate="true">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageTruncateHeadingExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
}
