import { Component } from '@angular/core';

import { PullToRefreshEvent } from '@kirbydesign/designsystem';

import { PageModule } from '@kirbydesign/designsystem/page';
import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page title="Pull-to-refresh" defaultBackHref="/" (refresh)="loadData($event)">
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  imports: [PageModule],
})
export class PagePullToRefreshExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
  static readonly handler = `loadData(event: PullToRefreshEvent) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.complete();
  }, 3000);
}`;

  loadData(event: PullToRefreshEvent) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 3000);
  }
}
