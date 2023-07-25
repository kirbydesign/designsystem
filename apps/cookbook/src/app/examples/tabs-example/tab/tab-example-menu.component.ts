import { Component } from '@angular/core';

@Component({
  template: `
    <kirby-page [title]="'Menu'">
      <kirby-page-content>
        <kirby-list [items]="menuItems">
          <kirby-item *kirbyListItemTemplate="let item" [disclosure]="'arrow-more'">
            <h3>{{ item }}</h3>
          </kirby-item>
        </kirby-list>
      </kirby-page-content>
    </kirby-page>
  `,
})
export class TabExampleMenuComponent {
  public menuItems = ['Overview', 'Transfer', 'Inbox', 'Settings', 'About'];
}
