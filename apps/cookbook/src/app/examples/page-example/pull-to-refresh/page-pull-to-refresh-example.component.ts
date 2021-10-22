import { Component } from '@angular/core';

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
})
export class PagePullToRefreshExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
  static readonly handler = `loadData(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 3000);
}`;

  loadData(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 3000);
  }
}
