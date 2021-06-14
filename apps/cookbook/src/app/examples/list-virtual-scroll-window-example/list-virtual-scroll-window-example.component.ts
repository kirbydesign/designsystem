import { Component } from '@angular/core';

import { BaseListComponent } from '../list-shared/base-list.component';

@Component({
  selector: 'cookbook-list-virtual-scroll-window-example',
  templateUrl: './list-virtual-scroll-window-example.component.html',
  styleUrls: ['./list-virtual-scroll-window-example.component.scss'],
})
export class ListVirtualScrollWindowExampleComponent extends BaseListComponent {}
