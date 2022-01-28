import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

const template = `<kirby-list-experimental>
<kirby-section-header list-header><h2 header>List with items</h2></kirby-section-header>
<kirby-item *ngFor="let item of items"><p>{{ item.title }}</p></kirby-item>
</kirby-list-experimental>`;

@Component({
  // tslint:disable-next-line
  selector: 'cookbook-list-experimental-items-example',
  template: template,
})
export class ListExperimentalItemsExampleComponent extends BaseListComponent {
  template: string = template;
}
