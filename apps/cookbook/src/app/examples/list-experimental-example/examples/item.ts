import { Component } from '@angular/core';

import { ListExperimentalComponent } from '@kirbydesign/designsystem/list';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';

import { ItemComponent } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

const template = `<kirby-list-experimental>
  <kirby-section-header outside>
    <h2 heading>Stocks</h2>
  </kirby-section-header>
  @for (item of items; track item.id) {
    <kirby-item>
      <p>{{ item.title }}</p>
      <data slot="end" class="kirby-text-bold">{{item.amount}}</data>
    </kirby-item>
  }
</kirby-list-experimental>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-experimental-items-example',
  template: template,
  imports: [SectionHeaderComponent, ItemComponent, ListExperimentalComponent],
})
export class ListExperimentalItemsExampleComponent extends BaseListComponent {
  template: string = template;
}
