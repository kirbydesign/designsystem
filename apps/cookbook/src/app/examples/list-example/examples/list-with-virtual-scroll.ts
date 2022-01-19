import { Component } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';
@Component({
  // tslint:disable-next-line
  selector: 'list-with-virtual-scroll',
  template: `
    <kirby-page title="Items">
      <kirby-page-content>
        <cdk-virtual-scroll-viewport
          minBufferPx="280"
          maxBufferPx="560"
          itemSize="56"
          style="height: 280px;"
        >
          <kirby-list-experimental>
            <kirby-item *cdkVirtualFor="let item of itemsFullList">
              <h1>{{ item.id }}: {{ item.title }}</h1>
            </kirby-item>
          </kirby-list-experimental>
        </cdk-virtual-scroll-viewport>
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListVirtualScrollExampleComponent extends BaseListComponent {}
