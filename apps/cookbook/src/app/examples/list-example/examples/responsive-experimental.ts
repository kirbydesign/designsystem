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
      <h3 slot="A">{{item.title}}</h3>
      <p subtitle slot="B">{{item.subTitle}}</p>
      <data [value]="item.amount" slot="C">{{item.amount}}</data>
      <data [value]="item.detail" detail slot="D">{{item.detail}}</data>
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
      <kirby-page-content> ${ListResponsiveExampleTemplate} </kirby-page-content>
    </kirby-page>
  `,
  styles: [
    'p { margin: 0; }',
    '.footer { text-align: center; width: 100%; }',
    ':host { --page-content-max-width: auto; }',
  ],
})
export class ListResponsiveExperimentalExampleComponent extends BaseListComponent {}
