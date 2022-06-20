import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListResponsiveExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <!-- HEADER-->
  <kirby-list-header *kirbyListHeader>
    <p>Name</p>
    <p>Value</p>
  </kirby-list-header>

  <!-- BODY -->
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-item-responsive>
      <h3>{{item.title}}</h3>
      <p subtitle>{{item.subTitle}}</p>
      <data [value]="item.amount">{{item.amount}}</data>
      <data [value]="item.detail" detail>{{item.detail}}</data>
    </kirby-item-responsive>
  </kirby-item>

  <!-- Footer -->
  <div class="footer" *kirbyListFooter>
    <p>An appropriate footer</p>
    <button kirby-button>Click me!</button>
  </div>
</kirby-list>`;

export const ListResponsiveWithAvatarExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <!-- HEADER-->
  <kirby-list-header *kirbyListHeader>
    <p>Name</p>
    <p>Value</p>
  </kirby-list-header>

  <!-- BODY -->
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-avatar overlay="true" slot="start">
      <kirby-icon name="moneybag"></kirby-icon>
    </kirby-avatar>
    <kirby-item-responsive>
      <h3>{{item.title}}</h3>
      <p subtitle>{{item.subTitle}}</p>
      <data [value]="item.amount">{{item.amount}}</data>
      <data [value]="item.detail" detail>{{item.detail}}</data>
    </kirby-item-responsive>
  </kirby-item>

  <!-- Footer -->
  <div class="footer" *kirbyListFooter>
    <p>An appropriate footer</p>
    <button kirby-button>Click me!</button>
  </div>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-responsive-experimental-example',
  template: `
    <kirby-page title="Responsive List (Experimental)">
      <kirby-page-content>
        ${ListResponsiveExampleTemplate}
        <h2>List items with avatars</h2>
        ${ListResponsiveWithAvatarExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
  styles: [
    'p { margin: 0; }',
    '.footer { text-align: center; width: 100%; }',
    ':host { --page-content-max-width: auto; }',
    'h2 { margin: 4rem 1rem 2rem; }',
  ],
})
export class ListResponsiveExperimentalExampleComponent extends BaseListComponent {}
