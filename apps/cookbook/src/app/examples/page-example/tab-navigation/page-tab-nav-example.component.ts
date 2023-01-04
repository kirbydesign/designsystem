import { Component } from '@angular/core';
import { LocalNavigationItem } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `NO <kirby-page title="Simple Page" subtitle="Subtitle of simple page" defaultBackHref="/">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  templateUrl: './page-tab-nav-example.component.html',
})
export class PageTabNavExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
}
