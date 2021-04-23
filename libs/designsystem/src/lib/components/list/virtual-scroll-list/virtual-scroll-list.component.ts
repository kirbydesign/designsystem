import { Component, ViewChild } from '@angular/core';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListComponent } from '../list.component';

@Component({
  selector: 'kirby-virtual-scroll-list',
  templateUrl: './virtual-scroll-list.component.html',
  styleUrls: ['../list.component.scss'],
})
export class VirtualScrollListComponent {
  @ViewChild(ListItemComponent) listItem: ListItemComponent;
  constructor(public listComponent: ListComponent) {}
}
