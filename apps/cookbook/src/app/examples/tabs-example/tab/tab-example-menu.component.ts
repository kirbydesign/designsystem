import { Component } from '@angular/core';
import { PageComponent, PageContentComponent } from '@kirbydesign/designsystem/page';
import { ListComponent } from '@kirbydesign/designsystem/list';
import { ItemComponent } from '@kirbydesign/designsystem/item';

@Component({
  template: `
    <kirby-page [title]="'Menu'">
      <kirby-page-content>
        <kirby-list [items]="menuItems">
          <kirby-item *kirbyListItemTemplate="let item" [disclosure]="'arrow-more'">
            <p class="kirby-item-title">{{ item }}</p>
          </kirby-item>
        </kirby-list>
      </kirby-page-content>
    </kirby-page>
  `,
  imports: [PageComponent, PageContentComponent, ListComponent, ItemComponent],
})
export class TabExampleMenuComponent {
  public menuItems = ['Overview', 'Transfer', 'Inbox', 'Settings', 'About'];
}
