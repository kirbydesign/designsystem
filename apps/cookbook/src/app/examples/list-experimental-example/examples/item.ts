import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

const template = `<kirby-list-experimental>
  <kirby-section-header outside>
    <h2 heading>Stocks</h2>
  </kirby-section-header>
  <kirby-item *ngFor="let item of items">
    <p>{{ item.title }}</p>
    <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
  </kirby-item>
</kirby-list-experimental>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-experimental-items-example',
  template: template,
})
export class ListExperimentalItemsExampleComponent extends BaseListComponent {
  template: string = template;
}
