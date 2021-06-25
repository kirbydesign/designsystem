import { Component } from '@angular/core';

import { BaseListComponent } from '../list-shared/base-list.component';

@Component({
  selector: 'cookbook-list-virtual-scroll-example',
  templateUrl: './list-virtual-scroll-example.component.html',
  styleUrls: ['./list-virtual-scroll-example.component.scss'],
})
export class ListVirtualScrollExampleComponent extends BaseListComponent {
  constructor() {
    super();
  }
}
