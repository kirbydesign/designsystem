import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

export const ListItemsExampleTemplate = `<kirby-list-experimental>
<kirby-section-header list-header><h2 header>List with items</h2></kirby-section-header>
<kirby-item *ngFor="let item of items"><p>{{ item.title }}</p></kirby-item>
</kirby-list-experimental>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-experimental-items-example',
  template: `
    ${ListItemsExampleTemplate}
  `,
})
export class ListExperimentalItemsExampleComponent extends BaseListComponent {}
