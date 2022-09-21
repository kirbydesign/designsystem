import { Component } from '@angular/core';
import { LocalNavigationItem } from '@kirbydesign/designsystem';
import { BehaviorSubject } from 'rxjs';

import { BasePageExampleComponent } from '../base-page-example.component';

const config = {
  template: `<kirby-page title="Simple Page" subtitle="Subtitle of simple page" defaultBackHref="/">
<kirby-page-local-navigation *kirbyFixedTopContent [items]="items" [selectedIndex]="selectedIndex$ | async" (itemSelect)="onItemSelect($event)"></kirby-page-local-navigation>
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageSimpleExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');

  onItemSelect(selected: LocalNavigationItem) {
    const index = this.items.findIndex((item) => item.id === selected.id);
    if (index > -1) {
      this.selectedIndex$.next(index);
    }
  }

  selectedIndex$ = new BehaviorSubject(0);

  items: LocalNavigationItem[] = [
    {
      id: 'holdings',
      text: 'Beholdning',
    },
    {
      id: 'marked',
      text: 'Marked',
      badge: {
        icon: 'attach',
        themeColor: 'warning',
      },
    },
    {
      id: 'inspiration',
      text: 'Inspiration',
      badge: {
        themeColor: 'success',
        content: '2',
      },
    },
    {
      id: '4',
      text: 'Item 4',
    },
    {
      id: '5',
      text: 'Item 5 longer',
    },
    {
      id: '6',
      text: 'Item 6 longer',
    },
  ];
}
