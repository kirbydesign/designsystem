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
  templateUrl: './page-simple-example.component.html',
})
export class PageSimpleExampleComponent extends BasePageExampleComponent {
  items: LocalNavigationItem[] = [
    {
      text: 'Item 1',
    },
    {
      text: 'Item 2',
      badge: {
        content: { name: 'attach', isCustom: false },
        themeColor: 'warning',
      },
    },
    {
      text: 'Item 3',
      badge: {
        themeColor: 'success',
        content: { text: '2' },
      },
    },
    {
      text: 'Item 4',
    },
    {
      text: 'Item 5 longer',
    },
    {
      text: 'Item 6 longer',
    },
  ];

  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');
}
