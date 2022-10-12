import { Component } from '@angular/core';
import { LocalNavigationItem } from '@kirbydesign/designsystem';
import { BasePageExampleComponent } from '../../../page-example/base-page-example.component';

const config = {
  template: `<kirby-page title="Simple Page" subtitle="Subtitle of simple page" defaultBackHref="/">
  <kirby-page-local-navigation *kirbyPageStickyContent [items]="items" [selectedIndex]="0"></kirby-page-local-navigation>
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageLocalNavigationExampleComponent extends BasePageExampleComponent {
  items: LocalNavigationItem[] = [
    {
      text: 'Beholdning',
    },
    {
      text: 'Marked',
      badge: {
        content: { name: 'attach', isCustom: false },
        themeColor: 'warning',
      },
    },
    {
      text: 'Inspiration',
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
